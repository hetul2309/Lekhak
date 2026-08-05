import express from 'express'
import { generateCategorySuggestions, generateBlogSummary, generateBlogDescription } from '../controllers/blogAI.controller.js'
import { getSmartSearchOverview } from '../controllers/smartSearch.controller.js'
import { authenticate } from '../middleware/authenticate.js'

const BlogAIRoute = express.Router()

BlogAIRoute.post('/categorize', authenticate, generateCategorySuggestions)
BlogAIRoute.post('/generate-description', authenticate, generateBlogDescription)
BlogAIRoute.get('/summary/:blogId', authenticate, generateBlogSummary)
BlogAIRoute.get('/smart-search', getSmartSearchOverview)

export default BlogAIRoute
