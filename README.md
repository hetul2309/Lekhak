# ✒️ Lekhak — Modern Full-Stack AI-Powered Blogging Platform

**Lekhak** (लेखक) is a state-of-the-art, feature-rich blogging and publishing platform built using the **MERN Stack** (MongoDB, Express, React 19, Node.js) and enhanced with **Google Gemini AI**. Designed with a vibrant **Coral Sunset Theme** (`#FF6A00` → `#FF2D8D`), Lekhak provides writers with a rich **Jodit Word Processor**, AI-powered content assistance, and interactive social engagement.

---

## 🌟 Key Features

### 🎨 Design & User Experience
* **Coral Sunset Aesthetics**: Custom OKLCH design system featuring soft radial glows, dynamic gradient badges, glassmorphism elements, and smooth micro-animations.
* **Responsive Layouts**: Optimised for screens from mobile devices up to ultra-wide desktop monitors, featuring an expand-by-default desktop navigation sidebar.
* **Jodit Word Processor**: Full-fledged rich text editor supporting font styling, tables, code blocks, media embeds, and live character/word count.
* **Activity Heatmap**: GitHub-style contribution heatmaps for creator profile pages.

### 🤖 AI-Powered Capabilities (Google Gemini 2.5)
* **AI Auto-Categorization**: Automatically analyzes blog draft content and assigns matching category tags.
* **AI Description Generator**: Generates concise, engaging 3-4 line blog summaries for previews and SEO.
* **AI Blog Summarizer**: Interactive modal providing readers with instant bullet-point summaries of long articles.
* **AI Content Moderation**: Real-time screening for inappropriate content, hate speech, spam, and policy violations.

### 📚 Multi-Category Architecture & Rich Content
* **14 Diverse Categories**: Gujarat & Culture, Current Affairs, Technology & AI, Politics & Governance, Education & Learning, Science & Space, Travel & Heritage, Business & Startups, Food & Culinary, Lifestyle & Wellness, Environment & Climate, Sports & Athletics, Entertainment & Cinema, Finance & Markets.
* **Multi-Tag Support**: Each blog post can be tagged under multiple categories simultaneously.
* **Pre-Seeded Dataset**: Includes automated MongoDB seed script populating 25 Indian & Gujarati creators, 65+ rich articles, and 200+ comments.

### 🛡️ Admin Management & Safety
* **Admin Portal**: Integrated dashboard for managing categories (`/categories`), user roles & ban status (`/users`), and content reports (`/reports`).
* **Direct Admin Auth**: Automated admin provisioning and login via `.env` credentials (`EMAIL_USER` & `ADMIN_PASS`).
* **User Reporting System**: Flag inappropriate posts with specific report reasons for admin moderation.

### 🔐 Security & Auth
* **JWT & HttpOnly Cookies**: Secure token storage with XSS/CSRF mitigation.
* **Google OAuth2**: One-click Google sign-in.
* **Email OTP Verification**: Email verification flow for new account registrations.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, Vite, Tailwind CSS v4, Redux Toolkit, Lucide Icons, Jodit-React, React-Hook-Form, Zod.
* **Backend**: Node.js, Express.js, Mongoose ORM, JSON Web Tokens (JWT), Bcrypt, Nodemailer.
* **Database**: MongoDB Atlas.
* **AI Engine**: `@google/genai` (Gemini 2.5 Flash Model).

---

## 📂 Project Structure

```
Lekhak/
├── client/                 # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Editor, Cards, Topbar, Sidebar)
│   │   ├── pages/          # Application Pages (Home, AddBlog, SingleBlog, Admin)
│   │   ├── redux/          # Redux Store & User Slices
│   │   ├── helpers/        # Route names, toast notifications, env getters
│   │   ├── hooks/          # Custom hooks (useFetch, useIsMobile)
│   │   ├── index.css       # Coral Sunset theme tokens & utility classes
│   │   └── main.jsx        # React entrypoint
│   └── .env                # Client environment config
│
├── api/                    # Express.js Backend Server
│   ├── controllers/        # Route controllers (Auth, Blog, Category, Admin)
│   ├── models/             # Mongoose Schemas (User, Blog, Category, Comment)
│   ├── routes/             # Express API Endpoints
│   ├── scripts/            # Database seeder (seed.js) & debug scripts
│   └── .env                # Backend environment config
│
└── README.md               # Project Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js**: v18 or higher
* **MongoDB**: MongoDB Atlas connection string
* **Gemini API Key**: [Google AI Studio](https://aistudio.google.com/) API Key

### 2. Environment Setup

**Backend Config (`api/.env`)**:
```env
PORT=3000
NODE_ENV=development
MONGODB_CONN=mongodb+srv://<username>:<password>@cluster.mongodb.net/Lekhak?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
EMAIL_USER=bloglekhak2629@gmail.com
ADMIN_PASS=lekhak_hk@26
FRONTEND_URL=http://localhost:5173
```

**Frontend Config (`client/.env`)**:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_EMAIL_USER=bloglekhak2629@gmail.com
ADMIN_PASS=lekhak_hk@26
```

---

### 3. Installation & Local Development

#### Run Backend Server
```bash
cd api
npm install
npm run dev
```
*API runs at `http://localhost:3000`*

#### Run Frontend Application
```bash
cd client
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`*

---

### 🎲 Seed Sample Database

To populate your MongoDB database with 25 Indian/Gujarati creators, 14 categories, and 65+ articles:

```bash
cd api
node scripts/seed.js
```

---

## 🔑 Admin Portal Access

Log in on the Sign In page using your `.env` Admin credentials:
* **Email**: `bloglekhak2629@gmail.com`
* **Password**: `lekhak_hk@26`

Once authenticated, your account will be automatically granted the **Admin** role, unlocking **Manage Categories** (`/categories`), **Manage Users** (`/users`), and **Reports** (`/reports`) in the navigation sidebar!

---

## 📄 License
This project is licensed under the MIT License.
