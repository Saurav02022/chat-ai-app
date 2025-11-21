# JobCraft AI

> AI-powered job search platform with resume optimization, ATS scoring, and real-time interview assistance.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Active%20Development-green)](https://github.com/Saurav02022/chat-ai-app)

## Overview

JobCraft AI is a comprehensive platform that helps job seekers land their dream jobs by providing:

- 📝 **Resume Optimization** - AI-powered ATS scoring and improvement suggestions
- 🎯 **Job Tracking** - Centralized dashboard for all applications
- 🤖 **Live Interview Assistant** - Real-time AI support during interviews
- 📄 **Smart Templates** - ATS-optimized resume generation

## Demo

> **Note:** Screenshots will be added as features are completed. Check back soon!

**Current State:** Phase 1 MVP Development (Days 1-20)

### Key Features Demo

- ✅ **Landing Page** - Hero section with feature showcase
- ✅ **Job Dashboard** - Track applications with visual pipeline
- ✅ **ATS Scoring** - Real-time resume analysis with breakdown
- 🚧 **Interview Assistant** - Coming in Week 3

## Why JobCraft AI?

**The Problem:** 75% of resumes never reach human reviewers due to ATS rejection. Job seekers struggle with scattered tools, interview anxiety, and lack of real-time feedback.

**Our Solution:** An all-in-one platform that combines ATS optimization, intelligent tracking, and live interview assistance—helping you go from application to offer with confidence.

**Who It's For:** Software engineers, designers, product managers, and tech professionals actively job hunting.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS + Shadcn UI
- **State:** Zustand + TanStack Query
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini (Gemini Pro)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Saurav02022/chat-ai-app.git
cd chat-ai-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Add your credentials to `.env.local`:

```env
# Google Gemini
GEMINI_API_KEY=your-gemini-api-key

# Supabase (optional for Phase 1)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
chat-ai-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── jobs/              # Job management components
│   ├── shared/            # Shared components
│   └── ui/                # Shadcn UI components
├── lib/                   # Utility functions
│   ├── stores/            # Zustand stores
│   ├── ai.ts              # AI integration
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript types
└── docs/                  # Documentation
```

## Features

### ✅ Implemented

- [x] Landing page with hero and features
- [x] Job application tracking (CRUD)
- [x] Resume upload and preview
- [x] ATS scoring with AI analysis
- [x] Resume optimization suggestions
- [x] Company-specific insights
- [x] Dashboard with statistics
- [x] Individual job pages with tabs

### 🚧 In Progress

- [ ] Mock authentication system
- [ ] Resume template generation
- [ ] Interview assistant setup
- [ ] Audio processing for interviews

### 📋 Planned

- [ ] Real-time interview assistance
- [ ] Post-interview analysis
- [ ] Supabase integration
- [ ] Google OAuth authentication
- [ ] Mobile responsive design

## Development Roadmap

### Phase 1: MVP (Days 1-20)

Building UI-first with localStorage for rapid iteration.

- **Week 1:** Foundation, dashboard, job tracking
- **Week 2:** AI integration, ATS scoring
- **Week 3:** Interview assistant, audio processing

### Phase 2: Backend (Days 21-26)

Migrating to Supabase for production deployment.

See [Development Plan](./development-plan/README.md) for detailed timeline.

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Environment Variables

| Variable                        | Description                  | Required |
| ------------------------------- | ---------------------------- | -------- |
| `GEMINI_API_KEY`                | Google Gemini API key for AI | Yes      |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL         | Phase 2  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key       | Phase 2  |

## Contributing

This is currently a solo project under active development. Contributions welcome after MVP completion.

### Development Guidelines

1. Follow the existing code style and conventions
2. Write TypeScript with strict type checking
3. Use Shadcn UI components for consistency
4. Test features thoroughly before committing
5. Keep components small and focused

## Architecture

### High-Level System Design

```
┌─────────────────────────────────────────────┐
│           Client (Next.js 15)               │
│  ┌──────────────┐    ┌──────────────────┐  │
│  │  UI Layer    │    │  State Management │  │
│  │  (React)     │◄───┤  (Zustand)       │  │
│  └──────────────┘    └──────────────────┘  │
└─────────────────────────────────────────────┘
           │                    │
           ▼                    ▼
    ┌──────────────┐     ┌─────────────┐
    │ Google Gemini│     │  Supabase   │
    │  Gemini Pro  │     │ (PostgreSQL)│
    │              │     │  + Storage  │
    └──────────────┘     └─────────────┘
```

### Architecture Principles

- **UI-First Approach:** Build complete UI with localStorage before backend
- **Component-Driven:** Reusable components with clear props
- **Type-Safe:** Full TypeScript coverage
- **Accessible:** WCAG 2.1 AA compliance
- **Mobile-First:** Responsive design from the start

## Performance Targets

- Lighthouse Score: >90
- Page Load (LCP): <2s
- First Contentful Paint: <1s
- Time to Interactive: <3s

## Troubleshooting

### Common Issues

**"Module not found" errors**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Gemini API errors**

- Verify your `GEMINI_API_KEY` is set in `.env.local`
- Check API key has proper permissions
- Get your API key from https://makersuite.google.com/app/apikey

**Build failures**

```bash
# Check TypeScript errors
npm run type-check

# Run linter
npm run lint
```

**Development server won't start**

- Check if port 3000 is already in use
- Try: `npx kill-port 3000` then `npm run dev`

### FAQ

**Q: Do I need Supabase to run the app?**  
A: No, Phase 1 (Days 1-20) uses localStorage. Supabase is only needed for Phase 2.

**Q: Can I use a different AI provider?**  
A: Currently Google Gemini is used for all AI features. It's cost-effective and powerful for resume analysis and text processing.

**Q: Is the interview assistant visible to interviewers?**  
A: No, it's designed to be invisible with stealth mode and panic buttons for safety.

**Q: What browsers are supported?**  
A: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+. Audio features require modern browser APIs.

## Documentation

- [Product Requirements](./docs/PRD.md) - Product vision and requirements
- [Development Plan](./development-plan/README.md) - Day-by-day development guide
- [Design System](./DESIGN_SYSTEM.md) - UI/UX guidelines

## License

This project is private and proprietary. All rights reserved.

## Contact

**Saurav Kumar**

- Email: sk729584@gmail.com
- GitHub: [@Saurav02022](https://github.com/Saurav02022)

---

**Status:** 🚧 Active Development (Phase 1)  
**Last Updated:** October 24, 2025
