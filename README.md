# JobCraft AI - AI-Powered Job Search Platform

> Your ultimate AI companion for landing your dream job - from resume optimization to live interview assistance.

## 🎯 Product Vision

JobCraft AI is a comprehensive AI-powered platform that transforms the job search experience by providing intelligent tools for every stage of the application process. From optimizing your resume for ATS systems to providing real-time assistance during live interviews, JobCraft AI is your personal career coach powered by cutting-edge AI technology.

## 🚀 Core Features

### 1. **Intelligent Job Tracking Dashboard**

- Centralized hub for all job applications
- Visual pipeline tracking with status management
- Smart notifications and follow-up reminders
- Analytics and success rate monitoring
- Timeline visualization for each application

### 2. **AI-Powered Resume Optimization**

- Upload resume and job description for instant analysis
- Comprehensive ATS (Applicant Tracking System) scoring
- Detailed breakdown by category (keywords, format, content, experience, skills)
- Actionable improvement suggestions with before/after comparison
- Company-specific insights and optimization tips
- Resume version management and history tracking

### 3. **Smart Resume Templates**

- AI-generated resume templates optimized for specific jobs
- Multiple template variants (Modern, Professional, Company-Optimized)
- LaTeX source code generation for advanced customization
- High-quality PDF generation with ATS optimization
- Direct Overleaf integration for easy editing
- Template comparison and recommendation engine

### 4. **Live Interview Assistant** (Real-time AI Support)

- Real-time question detection during interviews
- Instant AI-powered answer suggestions based on your resume
- STAR method guidance for behavioral questions
- Technical interview support (coding, system design)
- Performance monitoring (confidence, pace, clarity, body language)
- Live transcript with speaker identification
- Speech coaching and improvement tips
- Emergency controls (stealth mode, panic mode)
- Company-specific insights and cultural fit tips

### 5. **Post-Interview Analysis**

- Complete interview transcript with timestamps
- AI-powered performance analysis and scoring
- Detailed improvement suggestions
- Interview history and comparison
- Interactive AI chat for feedback and coaching

### 6. **Interview Preparation Tools**

- Interview scheduling and preparation checklist
- Common interview questions database by company/role
- Company research and insights
- Practice mode with AI feedback
- Interview type-specific guidance (behavioral, technical, system design)

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Shadcn UI (New York style)
- **Animations**: Framer Motion
- **Icons**: Lucide React

### State Management & Data Fetching

- **Client State**: Zustand
- **Server State**: TanStack Query (React Query)
- **Local Storage**: For offline-first MVP phase

### Backend & Database (Phase 2)

- **Backend**: Supabase (Database, Auth, Storage)
- **Authentication**: Supabase Auth with Google OAuth
- **File Storage**: Supabase Storage

### AI & Processing

- **AI Provider**: OpenAI (GPT-4)
- **PDF Processing**: pdf-parse
- **PDF Generation**: jsPDF, Puppeteer
- **LaTeX**: node-latex
- **Audio Processing**: Web Audio API, Web Speech API / OpenAI Whisper

### Development Tools

- **Testing**: Vitest, React Testing Library, Playwright
- **Code Quality**: ESLint, Prettier, Husky
- **Deployment**: Vercel

## 📅 Development Timeline

**Total Duration**: 26 days (~4 weeks)
**Daily Commitment**: 2-3 hours (weekdays), full day (weekends)

### Phase 1: UI-First Development (Days 1-20)

- **Week 1**: Foundation, landing page, dashboard, job tracking
- **Week 2**: AI integration, resume analysis, ATS scoring, templates
- **Week 3**: Interview assistant, audio processing, live assistance
- **Week 4**: Testing, polish, preparation for backend integration

### Phase 2: Backend Integration (Days 21-26)

- Supabase setup and schema design
- Authentication migration (Google OAuth)
- Data migration from localStorage to Supabase
- Production deployment

## 🎨 Design Philosophy

- **Mobile-First**: Responsive design optimized for all devices
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **User Experience**: Intuitive, clean, and professional interface
- **Privacy-First**: Local processing where possible, transparent data handling

## 🔐 Privacy & Security

- **Local Processing**: Audio and sensitive data processed locally when possible
- **Encryption**: All data encrypted in transit and at rest
- **Privacy Controls**: User control over data retention and deletion
- **Stealth Mode**: Interview assistant completely invisible to interviewers
- **No Data Sharing**: User data never shared with third parties

## 🎯 Target Users

- **Job Seekers**: Professionals actively applying for jobs
- **Career Changers**: Individuals transitioning to new roles/industries
- **Recent Graduates**: Entry-level candidates needing guidance
- **Senior Professionals**: Experienced candidates targeting leadership roles
- **Tech Professionals**: Software engineers, designers, product managers

## 🌟 Unique Value Proposition

Unlike traditional job search tools, JobCraft AI provides:

1. **End-to-End Support**: From resume creation to post-interview analysis
2. **Real-Time Assistance**: Live AI support during actual interviews
3. **Personalization**: AI suggestions based on your specific resume and target job
4. **ATS Optimization**: Ensure your resume passes automated screening
5. **Company-Specific Insights**: Tailored advice for each company's culture and requirements
6. **Privacy-Focused**: Your interview assistance remains completely invisible

## 📊 Success Metrics

- **Resume Optimization**: 90%+ ATS score achievement rate
- **Interview Success**: Improved confidence and performance scores
- **User Satisfaction**: 95%+ positive feedback on AI suggestions
- **Time Savings**: 50% reduction in resume optimization time
- **Job Offers**: Increased offer rate for users leveraging all features

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Git for version control

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Saurav02022/chat-ai-app.git
cd chat-ai-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your OpenAI API key to `.env.local`:

```
OPENAI_API_KEY=your-openai-api-key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Development Plan

Detailed day-by-day development plan with checklists is available in the `development-plan/` folder. Each day includes:

- Clear goals and objectives
- Detailed task breakdowns
- Deliverables and success criteria
- Time estimates and scheduling

See [Development Plan](./development-plan/README.md) for the complete roadmap.

## 🤝 Contributing

This is currently a solo project under active development. Contributions, suggestions, and feedback are welcome once the MVP is complete.

## 📝 License

This project is private and proprietary. All rights reserved.

## 👤 Author

**Saurav Kumar**

- GitHub: [@Saurav02022](https://github.com/Saurav02022)
- Email: sk729584@gmail.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- AI powered by [OpenAI](https://openai.com/)
- Deployed on [Vercel](https://vercel.com/)

---

**Status**: 🚧 Under Active Development
**Current Phase**: Phase 1 - UI-First Development
**Last Updated**: January 2025
