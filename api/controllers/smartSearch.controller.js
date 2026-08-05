import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { handleError } from '../helpers/handleError.js';
import Blog from '../models/blog.model.js';
import { toPlainText } from './blogAI.controller.js';

export const getSmartSearchOverview = async (req, res, next) => {
  try {
    const query = String(req.query.q || req.body?.q || '').trim();

    if (!query) {
      return res.status(200).json({
        success: true,
        overview: '',
        relatedTopics: [],
      });
    }

    // 1. Find matching published blogs to serve as context
    const regexQuery = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    
    const matchingBlogs = await Blog.find({
      status: 'published',
      $or: [
        { title: regexQuery },
        { description: regexQuery },
        { summary: regexQuery }
      ]
    })
      .select('title description blogContent categories')
      .populate('categories', 'name')
      .sort({ views: -1, createdAt: -1 })
      .limit(5)
      .lean()
      .exec();

    // Context snippets from database blogs
    const blogContextText = matchingBlogs.length > 0
      ? matchingBlogs
          .map((b, i) => `${i + 1}. Title: ${b.title}\nDescription: ${b.description || toPlainText(b.blogContent).slice(0, 150)}`)
          .join('\n\n')
      : `Topic: ${query}`;

    // Fallback if Gemini key is missing
    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        overview: matchingBlogs.length > 0
          ? `Showing search results for "${query}". Found ${matchingBlogs.length} articles covering key topics.`
          : `Explore articles and creators writing about "${query}".`,
        relatedTopics: Array.from(new Set(
          matchingBlogs.flatMap(b => (b.categories || []).map(c => c.name)).filter(Boolean)
        )).slice(0, 5),
      });
    }

    // 2. Invoke Gemini AI for AI Overview & Related Topics
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        'You are an AI search assistant for Lekhak, a premium blogging platform. ' +
        'Generate a concise, informative 2-3 sentence AI Overview synthesizing key knowledge about the user\'s search topic based on provided articles. ' +
        'Also provide 4 to 5 related search topic keywords. ' +
        'Respond ONLY with a valid JSON object in this format:\n' +
        '{\n  "overview": "2-3 sentence summary...",\n  "relatedTopics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4"]\n}'
      ],
      [
        'human',
        'User Search Query: "{query}"\n\nRelated Articles Context:\n{context}\n\nRespond with the JSON object now.'
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
    let lastErr = null;

    for (const modelId of candidateModels) {
      try {
        const model = new ChatGoogleGenerativeAI({
          apiKey: process.env.GEMINI_API_KEY,
          model: modelId,
          temperature: 0.3,
          maxOutputTokens: 350,
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
        lastErr = err;
      }
    }

    let parsedResult = {
      overview: '',
      relatedTopics: [],
    };

    if (aiOutputText) {
      const jsonStart = aiOutputText.indexOf('{');
      const jsonEnd = aiOutputText.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        try {
          parsedResult = JSON.parse(aiOutputText.slice(jsonStart, jsonEnd + 1));
        } catch (e) {
          console.error('Failed to parse AI Search response JSON:', e);
        }
      }
    }

    // Default fallbacks if AI parse failed or yielded empty fields
    if (!parsedResult.overview) {
      parsedResult.overview = matchingBlogs.length > 0
        ? `Comprehensive articles covering "${query}" featuring key perspectives on ${matchingBlogs.map(b => b.title).slice(0, 2).join(' and ')}.`
        : `Discover perspectives and insights related to "${query}" across Lekhak.`;
    }

    if (!Array.isArray(parsedResult.relatedTopics) || parsedResult.relatedTopics.length === 0) {
      parsedResult.relatedTopics = Array.from(new Set([
        query,
        ...matchingBlogs.flatMap(b => (b.categories || []).map(c => c.name)),
      ])).filter(Boolean).slice(0, 5);
    }

    return res.status(200).json({
      success: true,
      overview: parsedResult.overview,
      relatedTopics: parsedResult.relatedTopics,
    });
  } catch (error) {
    console.error('Error in getSmartSearchOverview:', error);
    return res.status(200).json({
      success: true,
      overview: `Explore blogs and author profiles related to "${req.query.q || ''}".`,
      relatedTopics: [],
    });
  }
};
