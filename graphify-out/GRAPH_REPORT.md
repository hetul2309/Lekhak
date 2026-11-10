# Graph Report - Lekhak  (2026-11-10)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1067 nodes · 3719 edges · 65 communities (46 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 106 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1cf5b8b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- getEnv
- showToast
- Auth.controller.js
- App.jsx
- client/package.json
- index.js
- user.model.js
- devDependencies
- handleError
- mongoose
- cn
- User.controller.js
- seed.js
- package.json
- vitest
- reports.controller.test.js
- components.json
- NotificationDropdown.jsx
- moderation.js
- api/package.json
- main.jsx
- blogAI.controller.js
- dependencies
- dropdown-menu.jsx
- sheet.jsx
- firebase.js
- select.jsx
- ManageUsers.jsx
- follow.controller.js
- blog.controller.test.js
- FakeChain
- scripts
- ActivityHeatmap.jsx
- ArticleCard.jsx
- vite.config.js
- utils.js
- scripts
- res
- OtpVerification.jsx
- SidebarProvider
- user.slice.js
- SignIn.test.jsx
- AddBlog.test.jsx
- api/vercel.json
- compilerOptions
- SaveButton.test.jsx
- Profile.test.jsx
- react-toastify
- slugify
- Footer.jsx
- ModerationWarning.jsx
- ProtectedRoute.test.jsx
- LikeCount.test.jsx
- cloudinary
- cookie-parser
- cors
- entities@^7.0.0
- @google/generative-ai@^0.6.0
- multer
- nodemon@^3.1.10
- socket.io
- blog.js
- client/vercel.json

## God Nodes (most connected - your core abstractions)
1. `getEnv()` - 93 edges
2. `cn()` - 90 edges
3. `react` - 86 edges
4. `handleError()` - 73 edges
5. `showToast()` - 67 edges
6. `react-router-dom` - 53 edges
7. `Button()` - 45 edges
8. `useFetch()` - 44 edges
9. `lucide-react` - 44 edges
10. `vitest` - 38 edges

## Surprising Connections (you probably didn't know these)
- `DropdownMenuCheckboxItem()` --calls--> `cn()`  [EXTRACTED]
  client/src/components/ui/dropdown-menu.jsx → client/src/lib/utils.js
- `DropdownMenuLabel()` --calls--> `cn()`  [EXTRACTED]
  client/src/components/ui/dropdown-menu.jsx → client/src/lib/utils.js
- `DropdownMenuRadioItem()` --calls--> `cn()`  [EXTRACTED]
  client/src/components/ui/dropdown-menu.jsx → client/src/lib/utils.js
- `DropdownMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  client/src/components/ui/dropdown-menu.jsx → client/src/lib/utils.js
- `DropdownMenuSubContent()` --calls--> `cn()`  [EXTRACTED]
  client/src/components/ui/dropdown-menu.jsx → client/src/lib/utils.js

## Import Cycles
- None detected.

## Communities (65 total, 19 thin omitted)

### Community 0 - "getEnv"
Cohesion: 0.08
Nodes (80): App(), BackButton(), BlogCard(), CategoryBar(), CommentList(), FeaturedCard(), FeedTabs(), FollowButton() (+72 more)

### Community 1 - "showToast"
Cohesion: 0.10
Nodes (62): Comments(), onSubmit(), DraftsList(), Editor(), ModerationErrorDisplay(), ModerationErrorList(), Button(), buttonVariants (+54 more)

### Community 2 - "Auth.controller.js"
Cohesion: 0.06
Nodes (58): checkUsernameAvailability(), getCookieConfig(), GoogleLogin(), issueAuthCookie(), Login(), Logout(), minutesToMs(), OTP_EXPIRY_MINUTES (+50 more)

### Community 3 - "App.jsx"
Cohesion: 0.09
Nodes (42): AppSidebar(), SidebarItem(), NotificationBell(), NotificationDropdown, SearchBox(), Topbar(), TOPBAR_HEIGHT_PX, DropdownMenu() (+34 more)

### Community 4 - "client/package.json"
Cohesion: 0.05
Nodes (49): dependencies, axios@^1.7.7, ckeditor5@^47.0.0, @ckeditor/ckeditor5-react@^11.0.0, class-variance-authority@^0.7.1, clsx@^2.1.1, entities@^7.0.0, framer-motion@^12.23.24 (+41 more)

### Community 5 - "index.js"
Cohesion: 0.07
Nodes (31): doLike(), likeBlog(), likeCount(), deleteNotification(), getNotifications(), markAllAsRead(), markAsRead(), addView() (+23 more)

### Community 6 - "user.model.js"
Cohesion: 0.15
Nodes (15): getSavedBlogs(), getSaveStatus(), normalizeSavedBlogs(), toggleSaveBlog(), User, userSchema, SaveRoute, chainQueue (+7 more)

### Community 7 - "devDependencies"
Cohesion: 0.07
Nodes (31): devDependencies, eslint@^9.35.0, @eslint/js@^9.35.0, eslint-plugin-react-hooks@^5.2.0, eslint-plugin-react-refresh@^0.4.20, globals@^16.4.0, jsdom@^27.1.0, postcss@^8.5.6 (+23 more)

### Community 8 - "handleError"
Cohesion: 0.20
Nodes (28): addBlog(), buildBlogResponse(), deleteBlog(), editBlog(), ensureUniquePublishedSlug(), escapeRegex(), fetchPopularFallback(), getAllBlogs() (+20 more)

### Community 9 - "mongoose"
Cohesion: 0.16
Nodes (18): addComment, commentCount(), deleteComment(), getAllComments(), getComments(), replyToComment(), Blog, blogSchema (+10 more)

### Community 10 - "cn"
Cohesion: 0.14
Nodes (26): CardAction(), Separator(), SidebarContent(), SidebarContext, SidebarFooter(), SidebarGroup(), SidebarGroupAction(), SidebarGroupContent() (+18 more)

### Community 11 - "User.controller.js"
Cohesion: 0.16
Nodes (17): storage, upload, deleteUser(), getAllUser(), getUser(), getUserContributionActivity(), getUserProfileOverview(), PASSWORD_REQUIREMENTS (+9 more)

### Community 12 - "seed.js"
Cohesion: 0.15
Nodes (18): addCategory(), deleteCategory(), getAllCategory(), showCategory(), updateCategory(), Category, categorySchema, categoriesData (+10 more)

### Community 13 - "package.json"
Cohesion: 0.11
Nodes (23): nodemailer@^9.0.5, firebase@^12.3.0, autoprefixer@^10.4.21, tailwindcss@^4.1.13, @types/node@^24.5.2, dependencies, axios@^1.13.2, entities@^7.0.0 (+15 more)

### Community 14 - "vitest"
Cohesion: 0.13
Nodes (9): navigateMock, mockShowToast, mockUseFetch, navigateMock, showToastMock, useFetchMock, mockNavigate, @testing-library/react (+1 more)

### Community 15 - "reports.controller.test.js"
Cohesion: 0.25
Nodes (14): adminBanReport(), adminRemoveReport(), adminSafeReport(), buildReportPayload(), listReports(), normalizeObjectId(), removeReportById(), reportBlog() (+6 more)

### Community 16 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 17 - "NotificationDropdown.jsx"
Cohesion: 0.24
Nodes (14): socket.io-client@^4.8.1, NotificationDropdown(), TypeIcon(), NotificationsContext, NotificationsProvider(), useNotifications(), deleteNotification(), fetchNotifications() (+6 more)

### Community 18 - "moderation.js"
Cohesion: 0.16
Nodes (13): moderateBlog(), moderateComment(), mockModerateBlog, mockModerateComment, analyzeContentWithKeywords(), CATEGORY_SUGGESTIONS, checkKeyword(), detectProhibitedContent() (+5 more)

### Community 19 - "api/package.json"
Cohesion: 0.14
Nodes (17): author, description, devDependencies, babel-jest@^30.2.0, @babel/preset-env@^7.28.5, jest@^30.2.0, supertest@^7.1.4, keywords (+9 more)

### Community 20 - "main.jsx"
Cohesion: 0.14
Nodes (13): react-dom@^19.1.1, @react-oauth/google@^0.13.5, redux-persist@^6.0.0, @reduxjs/toolkit@^2.9.0, persistConfig, persistedReducer, persistor, rootReducer (+5 more)

### Community 21 - "blogAI.controller.js"
Cohesion: 0.31
Nodes (11): deps, generateBlogDescription(), generateBlogSummary(), generateCategorySuggestions(), isHttpUrl(), normalizeSlugLike(), toPlainText(), tryParseCategoryResponse() (+3 more)

### Community 22 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, axios@^1.7.7, bcryptjs@^3.0.2, dotenv@^17.2.2, express@^5.1.0, express-rate-limit@^8.2.1, @faker-js/faker@^9.9.0, jsonwebtoken@^9.0.2 (+6 more)

### Community 23 - "dropdown-menu.jsx"
Cohesion: 0.15
Nodes (8): DropdownMenuCheckboxItem(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent(), DropdownMenuSubTrigger()

### Community 24 - "sheet.jsx"
Cohesion: 0.26
Nodes (9): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetPortal(), SheetTitle() (+1 more)

### Community 25 - "firebase.js"
Cohesion: 0.17
Nodes (8): app, auth, firebaseConfig, provider, getAuthMock, GoogleAuthProviderMock, initializeAppMock, providerInstance

### Community 26 - "select.jsx"
Cohesion: 0.22
Nodes (7): SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 27 - "ManageUsers.jsx"
Cohesion: 0.40
Nodes (9): Table(), TableBody(), TableCaption(), TableCell(), TableFooter(), TableHead(), TableHeader(), TableRow() (+1 more)

### Community 28 - "follow.controller.js"
Cohesion: 0.36
Nodes (8): checkFollowStatus(), followUser(), getFollowers(), getFollowing(), getFollowStats(), unfollowUser(), FollowRoute, notifyFollow()

### Community 29 - "blog.controller.test.js"
Cohesion: 0.31
Nodes (7): createTestBlog(), createTestCategory(), createTestUser(), mockModerateBlog, mockNotifyFollowersNewPost, mockUpload, unique()

### Community 30 - "FakeChain"
Cohesion: 0.20
Nodes (3): FakeChain, MockChatGoogleGenerativeAI, MockStringOutputParser

### Community 31 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, dev, start, test, test:coverage, test:coverage:one, test:one, test:watch (+1 more)

### Community 32 - "ActivityHeatmap.jsx"
Cohesion: 0.31
Nodes (5): ActivityHeatmap(), DAY_LABELS, formatTooltip(), INTENSITY_BUCKETS, parseDate()

### Community 33 - "ArticleCard.jsx"
Cohesion: 0.33
Nodes (5): ArticleCard(), Latest_Blogs(), filters, baseBlog, navigateMock

### Community 34 - "vite.config.js"
Cohesion: 0.25
Nodes (6): @tailwindcss/vite@^4.1.13, vite@^7.1.6, @vitejs/plugin-react@^5.0.2, @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 35 - "utils.js"
Cohesion: 0.36
Nodes (6): SidebarMenuButton(), sidebarMenuButtonVariants, Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger()

### Community 36 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, preview, test

### Community 38 - "OtpVerification.jsx"
Cohesion: 0.50
Nodes (4): formatTimeLeft(), OTP_EXPIRY_MINUTES, OtpVerification(), RESEND_INTERVAL_MINUTES

### Community 39 - "SidebarProvider"
Cohesion: 0.60
Nodes (3): SidebarProvider(), useIsMobile(), TestComponent()

### Community 40 - "user.slice.js"
Cohesion: 0.40
Nodes (3): initialState, userSlice, demoUser

### Community 41 - "SignIn.test.jsx"
Cohesion: 0.40
Nodes (4): dispatchMock, getEnvMock, navigateMock, showToastMock

### Community 43 - "api/vercel.json"
Cohesion: 0.50
Nodes (3): builds, routes, version

### Community 44 - "compilerOptions"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, paths

### Community 46 - "Profile.test.jsx"
Cohesion: 0.50
Nodes (3): mockDispatch, showToastMock, useFetchMock

### Community 47 - "react-toastify"
Cohesion: 0.67
Nodes (3): react-toastify@^11.0.5, react-toastify, react-toastify@^11.0.5

### Community 48 - "slugify"
Cohesion: 0.67
Nodes (3): slugify@^1.6.6, slugify, slugify@^1.6.6

## Knowledge Gaps
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `getEnv` to `showToast`, `App.jsx`, `client/package.json`, `cn`, `vitest`, `NotificationDropdown.jsx`, `main.jsx`, `dropdown-menu.jsx`, `sheet.jsx`, `select.jsx`, `ManageUsers.jsx`, `ActivityHeatmap.jsx`, `ArticleCard.jsx`, `utils.js`, `OtpVerification.jsx`, `SidebarProvider`, `SignIn.test.jsx`, `AddBlog.test.jsx`, `Profile.test.jsx`, `Footer.jsx`, `ModerationWarning.jsx`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `getEnv()` (e.g. with `DraftsList.test.jsx` and `RelatedBlog.test.jsx`) actually correct?**
  _`getEnv()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Should `getEnv` be split into smaller, more focused modules?**
  _Cohesion score 0.07799025121859768 - nodes in this community are weakly interconnected._
- **Why does `handleError()` connect `handleError` to `Auth.controller.js`, `index.js`, `user.model.js`, `mongoose`, `User.controller.js`, `seed.js`, `blogAI.controller.js`, `follow.controller.js`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `showToast()` (e.g. with `DraftsList.test.jsx` and `FollowButton.test.jsx`) actually correct?**
  _`showToast()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `showToast` be split into smaller, more focused modules?**
  _Cohesion score 0.10256410256410256 - nodes in this community are weakly interconnected._
- **Why does `mongoose` connect `mongoose` to `Auth.controller.js`, `index.js`, `user.model.js`, `User.controller.js`, `seed.js`, `reports.controller.test.js`, `api/package.json`, `dependencies`, `blog.controller.test.js`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._