import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import Blog from '../models/blog.model.js';
import Category from '../models/category.model.js';
import { toPlainText } from './blogAI.controller.js';

export const getSmartSearchOverview = async (req, res, next) => {
  try {
    const query = String(req.query.q || req.body?.q || '').trim();

    if (!query) {
      return res.status(200).json({
        success: true,
        overview: '',
        relatedTopics: [],
        smartRelatedBlogs: [],
      });
    }

    // 1. Initial regex match on published blogs
    const regexQuery = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    
    let initialMatchingBlogs = await Blog.find({
      status: 'published',
      $or: [
        { title: regexQuery },
        { description: regexQuery },
        { summary: regexQuery }
      ]
    })
      .select('title description blogContent categories author createdAt slug featuredImage views')
      .populate('author', 'name avatar')
      .populate('categories', 'name slug')
      .sort({ views: -1, createdAt: -1 })
      .limit(6)
      .lean()
      .exec();

    // Context snippets from database blogs
    const blogContextText = initialMatchingBlogs.length > 0
      ? initialMatchingBlogs
          .map((b, i) => `${i + 1}. Title: ${b.title}\nDescription: ${b.description || toPlainText(b.blogContent).slice(0, 150)}`)
          .join('\n\n')
      : `Topic: ${query}`;

    let parsedResult = {
      overview: '',
      keywords: [],
      relatedTopics: [],
    };

    // 2. Invoke Gemini AI if API key exists
    if (process.env.GEMINI_API_KEY) {
      const prompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          'You are an AI search assistant for Lekhak, a blogging platform. ' +
          'For any given user search query (e.g. "ml", "react", "gujarat", "isro"), provide:\n' +
          '1. "overview": A clear 2-3 sentence explanation defining and summarizing the topic (e.g. for "ml", explain Machine Learning, AI models, and data algorithms).\n' +
          '2. "keywords": Array of 4-6 semantic keywords, acronym expansions, or related technical concepts (e.g. for "ml": ["machine learning", "ai", "artificial intelligence", "deep learning"]).\n' +
          '3. "relatedTopics": Array of 4-6 short related search topic titles.\n' +
          'Respond ONLY with a valid JSON object in this format:\n' +
          '{\n  "overview": "2-3 sentence topic explanation...",\n  "keywords": ["keyword1", "keyword2", "keyword3"],\n  "relatedTopics": ["Topic 1", "Topic 2", "Topic 3"]\n}'
        ],
        [
          'human',
          'Search Query: "{query}"\n\nExisting Platform Context:\n{context}\n\nRespond with the JSON object now.'
        ]
      ]);

      const preferredModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const candidateModels = Array.from(new Set([
        preferredModel,
        'gemini-2.5-pro',
        'gemini-2.5-flash',
        'gemini-2.5-flash-lite',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
        'gemini-pro',
      ]));

      let aiOutputText = '';

      for (const modelId of candidateModels) {
        try {
          const model = new ChatGoogleGenerativeAI({
            apiKey: process.env.GEMINI_API_KEY,
            model: modelId,
            temperature: 0.3,
            maxOutputTokens: 400,
          });

          const chain = prompt.pipe(model).pipe(new StringOutputParser());
          const result = await chain.invoke({
            query,
            context: blogContextText,
          });

          if (result && result.trim()) {
            aiOutputText = result.trim();
            break;
          }
        } catch (err) {
          // try next model
        }
      }

      if (aiOutputText) {
        const jsonStart = aiOutputText.indexOf('{');
        const jsonEnd = aiOutputText.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          try {
            parsedResult = JSON.parse(aiOutputText.slice(jsonStart, jsonEnd + 1));
          } catch (e) {
            console.error('Failed to parse AI Search JSON response:', e);
          }
        }
      }
    }

    // Default overview fallback if AI output failed
    if (!parsedResult.overview) {
      if (query.toLowerCase() === 'ml') {
        parsedResult.overview = 'Machine Learning (ML) is a branch of artificial intelligence focused on building applications that learn from data and improve accuracy over time without being explicitly programmed.';
      } else {
        parsedResult.overview = initialMatchingBlogs.length > 0
          ? `Articles covering "${query}" featuring key perspectives on ${initialMatchingBlogs.map(b => b.title).slice(0, 2).join(' and ')}.`
          : `Explore articles, creators, and insights related to "${query}" across Lekhak.`;
      }
    }

    // 3. Search for Smart Related Blogs using AI Expanded Keywords (Limit max 6 posts)
    const expandedSearchTerms = Array.from(new Set([
      query,
      ...(parsedResult.keywords || []),
      ...(parsedResult.relatedTopics || [])
    ])).filter(Boolean);

    // Find category ObjectIds matching keywords
    const categoryMatches = await Category.find({
      $or: expandedSearchTerms.map(term => ({ name: new RegExp(term, 'i') }))
    }).select('_id').lean().exec();

    const categoryIds = categoryMatches.map(c => c._id);

    const searchOrConditions = [
      { categories: { $in: categoryIds } },
      ...expandedSearchTerms.map(term => {
        const rx = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        return [
          { title: rx },
          { description: rx },
          { summary: rx }
        ];
      }).flat()
    ];

    let smartRelatedBlogs = await Blog.find({
      status: 'published',
      $or: searchOrConditions
    })
      .select('title slug featuredImage categories author createdAt description summary views')
      .populate('author', 'name avatar')
      .populate('categories', 'name slug')
      .sort({ views: -1, createdAt: -1 })
      .limit(6) // STRICT LIMIT OF MAX 6 POSTS
      .lean()
      .exec();

    // If semantic search found fewer than 6, fallback to recent published blogs
    if (smartRelatedBlogs.length < 6) {
      const existingIds = new Set(smartRelatedBlogs.map(b => b._id.toString()));
      const fallbackBlogs = await Blog.find({
        status: 'published',
        _id: { $nin: Array.from(existingIds) }
      })
        .select('title slug featuredImage categories author createdAt description summary views')
        .populate('author', 'name avatar')
        .populate('categories', 'name slug')
        .sort({ views: -1, createdAt: -1 })
        .limit(6 - smartRelatedBlogs.length)
        .lean()
        .exec();

      smartRelatedBlogs = [...smartRelatedBlogs, ...fallbackBlogs];
    }

    // Fallback relatedTopics if empty
    if (!Array.isArray(parsedResult.relatedTopics) || parsedResult.relatedTopics.length === 0) {
      parsedResult.relatedTopics = Array.from(new Set([
        query,
        ...smartRelatedBlogs.flatMap(b => (b.categories || []).map(c => c.name)),
      ])).filter(Boolean).slice(0, 5);
    }

    return res.status(200).json({
      success: true,
      overview: parsedResult.overview,
      relatedTopics: parsedResult.relatedTopics,
      smartRelatedBlogs: smartRelatedBlogs.slice(0, 6), // Guarantee max 6 posts
    });
  } catch (error) {
    console.error('Error in getSmartSearchOverview:', error);
    return res.status(200).json({
      success: true,
      overview: `Explore blogs and creator profiles related to "${req.query.q || ''}".`,
      relatedTopics: [],
      smartRelatedBlogs: [],
    });
  }
};
