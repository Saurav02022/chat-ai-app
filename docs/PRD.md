# Product Requirements Document

**Product:** JobCraft AI  
**Version:** 1.0  
**Owner:** Saurav Kumar  
**Last Updated:** October 24, 2025

---

## Executive Summary

JobCraft AI is an AI-powered job search platform that helps job seekers optimize resumes, track applications, and ace interviews with real-time AI assistance.

**Key Differentiators:**

- Real-time interview assistant (invisible to interviewers)
- AI-powered ATS scoring and optimization
- Complete job search workflow in one platform

**Timeline:** 26 days (MVP: 20 days, Backend: 6 days)  
**Target Market:** Technical professionals (software engineers, designers, product managers)

**Table of Contents:**

- [Problem & Solution](#problem--solution)
- [Target Users](#target-users)
- [Core Features](#core-features)
- [What's Out of Scope](#whats-out-of-scope)
- [Success Criteria](#success-criteria)
- [Competitive Landscape](#competitive-landscape)
- [Technical Requirements](#technical-requirements)
- [User Flows](#user-flows)
- [Success Metrics](#success-metrics)
- [Development Timeline](#development-timeline)
- [Risks & Mitigation](#risks--mitigation)
- [Assumptions & Dependencies](#assumptions--dependencies)
- [Open Questions](#open-questions)
- [Future Considerations](#future-considerations)

---

## Problem & Solution

### The Problem

1. **75% of resumes** never reach human reviewers due to ATS rejection
2. **No real-time support** during critical interview moments
3. **Fragmented tools** - job seekers use 5-7 different platforms
4. **Generic advice** - templates don't account for company specifics

### Our Solution

An end-to-end platform providing:

- ATS-optimized resume analysis and templates
- Intelligent job application tracking
- Live AI assistant during interviews
- Company-specific insights and recommendations

---

## Target Users

### Primary: Tech-Savvy Tyler (70% of users)

- **Age:** 25-35
- **Role:** Software Engineer / Designer / PM
- **Experience:** 2-7 years
- **Pain Points:** Overwhelmed by applications, uncertain about ATS, interview anxiety
- **Willingness to Pay:** $20-50/month

### Secondary: Career Changer Casey (20% of users)

- **Age:** 28-40
- **Background:** Non-tech transitioning to tech
- **Pain Points:** Resume doesn't reflect tech skills, limited interview experience
- **Willingness to Pay:** $15-35/month

### Tertiary: Fresh Graduate Gina (10% of users)

- **Age:** 21-24
- **Background:** Recent college graduate
- **Pain Points:** Limited experience, interview anxiety
- **Willingness to Pay:** $10-25/month

---

## Core Features

### 1. Job Application Tracking (MVP)

**Priority:** P0

- Create, view, update, delete job applications
- Status tracking (Applied → Reviewing → Interview → Offer/Rejected)
- Search and filter by status, company, work type
- Timeline visualization of application history
- Dashboard with statistics (total apps, success rate, etc.)

**User Stories:**

- As a job seeker, I want to track all my applications in one place
- As a job seeker, I want to see my application pipeline at a glance
- As a job seeker, I want to update job status as I progress

### 2. Resume Optimization (MVP)

**Priority:** P0

- Upload resume (PDF, DOC, DOCX, max 5MB)
- AI-powered ATS scoring (0-100 with category breakdown)
- Identify strengths and improvement areas
- Company-specific insights
- Before/after comparison

**User Stories:**

- As a job seeker, I want to know my ATS score
- As a job seeker, I want specific suggestions to improve my resume
- As a job seeker, I want company-specific optimization tips

**ATS Score Breakdown:**

- Keyword Match (30%)
- Format & Structure (20%)
- Content Quality (25%)
- Experience Match (15%)
- Skills Alignment (10%)

### 3. Resume Templates (Post-MVP)

**Priority:** P1

- Generate 3 variants (Modern, Professional, Company-Optimized)
- LaTeX source code generation
- PDF download (ATS-optimized)
- Overleaf integration

### 4. Live Interview Assistant (MVP)

**Priority:** P0

- Microphone setup and audio testing
- Real-time question detection
- AI-powered answer suggestions (based on resume + job description)
- STAR method guidance for behavioral questions
- Performance monitoring (confidence, pace, clarity)
- Live transcript
- Emergency controls (mute, hide, panic mode)

**User Stories:**

- As a job seeker, I want real-time help during interviews
- As a job seeker, I want to remain confident during tough questions
- As a job seeker, I want the assistant to be invisible to interviewers

**Critical Requirements:**

- Latency <100ms for audio processing
- Unobtrusive UI (stealth mode)
- Instant hide/panic button

### 5. Post-Interview Analysis (Post-MVP)

**Priority:** P1

- Complete transcript review
- AI performance analysis
- Improvement recommendations
- Interview history and comparison

---

## What's Out of Scope

### Not Building (Phase 1-2)

**Features explicitly excluded from MVP:**

- ❌ Mobile native apps (iOS/Android) - Web-only for now
- ❌ Email notifications - No email system in Phase 1
- ❌ Team collaboration features - Single-user only
- ❌ Video recording/playback - Text transcript only
- ❌ Job board scraping/aggregation - Manual job entry
- ❌ LinkedIn auto-apply - No integration with job boards
- ❌ Calendar integration - No automated scheduling
- ❌ Payment/billing system - Free during development

**Future Considerations (Phase 3+):**

- Chrome extension for job boards
- LinkedIn profile sync
- Mobile apps
- Team features
- Monetization

**Why Not Now:**

- Focus on core value proposition first
- Validate product-market fit before expansion
- Avoid scope creep and timeline delays
- Keep MVP simple and shippable

---

## Success Criteria

### MVP is "Done" When:

**Functional Requirements (Must Have):**

- [x] User can create and track job applications
- [x] User can upload resume and get ATS score
- [ ] User can receive AI-powered improvement suggestions
- [ ] User can set up interview assistant
- [ ] User can use live assistant during mock interview
- [ ] Data persists in localStorage

**Quality Requirements (Must Have):**

- [ ] All features work on Chrome, Safari, Firefox, Edge
- [ ] Mobile-responsive design (320px+)
- [ ] No critical bugs (P0/P1)
- [ ] Page load <2s on 4G connection
- [ ] 5+ beta testers validate value

**Business Requirements (Should Have):**

- [ ] 80%+ of test users upload resume in first session
- [ ] 70%+ of test users understand ATS score immediately
- [ ] 4.0+ average satisfaction rating from beta users
- [ ] Clear value proposition validated

**Launch Readiness:**

- [ ] Privacy policy and terms of service ready
- [ ] Landing page clearly explains value
- [ ] Demo video created (2-3 minutes)
- [ ] Product Hunt listing prepared
- [ ] Support channel set up (email/Discord)

---

## Competitive Landscape

### Direct Competitors

**1. Rezi.ai**

- **Focus:** Resume building and ATS optimization
- **Strengths:** Established brand, good templates
- **Weaknesses:** No interview assistant, limited job tracking
- **Our Advantage:** Live interview support + comprehensive platform

**2. Interview Warmup (Google)**

- **Focus:** Interview practice with AI feedback
- **Strengths:** Free, backed by Google
- **Weaknesses:** Practice only, no real-time support
- **Our Advantage:** Works during actual interviews

**3. Teal / Huntr**

- **Focus:** Job tracking and organization
- **Strengths:** Great tracking features, established users
- **Weaknesses:** Weak AI features, no interview support
- **Our Advantage:** AI-first approach + live assistance

### Indirect Competitors

- **LinkedIn Premium:** Career tools, but no ATS scoring
- **Resume.io:** Templates, but no AI optimization
- **Glassdoor:** Company reviews, but no application tools

### Market Positioning

**JobCraft AI = Rezi.ai + Interview Warmup + Teal + Live AI Assistant**

We're the only platform combining all three:

1. ATS-optimized resume analysis
2. Intelligent job tracking
3. Real-time interview assistance

### Competitive Advantages

- **Unique Feature:** Live interview assistant (stealth mode)
- **Speed:** Built with latest tech (Next.js 15, GPT-4)
- **Integration:** End-to-end workflow in one platform
- **Privacy:** Data stored locally, user-controlled

---

## Technical Requirements

### Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Shadcn UI
- **State:** Zustand (client), TanStack Query (server)
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini (Gemini Pro)
- **Deployment:** Vercel

### Performance

- Page load: <2s
- API response: <500ms (p95)
- Resume analysis: <30s
- Interview latency: <100ms

### Security

- OAuth 2.0 with Google
- Row-level security (RLS) in database
- HTTPS/TLS 1.3 for all connections
- GDPR and CCPA compliant

### Scalability

- Support 10,000 concurrent users
- 1TB+ data storage
- Rate limiting: 100 requests/minute per user

---

## User Flows

### 1. First-Time User

```
Landing Page
  → Login (Google OAuth)
  → Dashboard (Empty State)
  → Add Job
  → Upload Resume
  → View ATS Score
  → Review Suggestions
```

**Success Criteria:**

- Complete in <5 minutes
- 80%+ upload resume in first session
- <10% drop-off rate

### 2. Resume Analysis

```
Job Page → Resume Review Tab
  → Upload File
  → AI Processing (20-30s)
  → View Score (0-100)
  → Review Breakdown
  → Read Suggestions
  → Apply Changes
```

**Success Criteria:**

- Analysis completes in <30s
- User understands score immediately
- 70%+ view detailed suggestions

### 3. Live Interview

```
Interview Page
  → Setup Wizard (platform, microphone test)
  → Start Interview
  → Question Detection
  → AI Suggestions
  → Performance Monitoring
  → End Interview
  → View Transcript
```

**Success Criteria:**

- Setup in <2 minutes
- 95%+ uptime during sessions
- User feels confident

---

## Success Metrics

### Product Goals (6 Months)

- **Users:** 10,000 registered users
- **Engagement:** 60%+ weekly active users
- **Value:** 85%+ achieve ATS score >70
- **NPS:** 60+ Net Promoter Score

### Key Metrics

| Metric          | Target                               |
| --------------- | ------------------------------------ |
| Activation Rate | 70% (upload resume in first session) |
| ATS Score >70   | 85% of users                         |
| Interview Setup | 80% complete setup                   |
| Retention D30   | 35%                                  |
| Average Session | 15+ minutes                          |

### Technical Metrics

| Metric             | Target |
| ------------------ | ------ |
| Lighthouse Score   | >90    |
| Page Load (LCP)    | <2s    |
| API Response (p95) | <500ms |
| Uptime             | 99.9%  |
| Error Rate         | <1%    |

---

## Development Timeline

### Phase 1: MVP with localStorage (20 days)

**Week 1: Foundation**

- [x] Day 1-2: Landing page ✅
- [ ] Day 3: Authentication & dashboard
- [x] Day 4: Job tracking ✅
- [x] Day 5-6: Resume upload & preview ✅
- [x] Day 7: Testing ✅

**Week 2: AI Features**

- [ ] Day 8: Gemini AI integration
- [x] Day 9: ATS scoring ✅
- [x] Day 10: Resume analysis UI ✅
- [ ] Day 11-12: Templates
- [ ] Day 13: Job enhancements
- [ ] Day 14: Testing

**Week 3: Interview Assistant**

- [ ] Day 15: Interview prep
- [ ] Day 16: Setup UI
- [ ] Day 17: Audio processing
- [ ] Day 18: Live assistant
- [ ] Day 19: Post-interview
- [ ] Day 20: Final polish

### Phase 2: Backend Integration (6 days)

- Day 21: Supabase setup
- Day 22: Auth migration
- Day 23: Jobs migration
- Day 24: Resumes migration
- Day 25: Interviews migration
- Day 26: Production deployment

**Launch Target:** November 25, 2025

---

## Risks & Mitigation

### High Priority

**Gemini API Costs**

- Risk: High usage → unsustainable costs (though Gemini is cost-effective)
- Mitigation: Cache responses, implement usage limits, monitor daily

**Interview Assistant Detection**

- Risk: Interviewer notices the assistant
- Mitigation: Stealth mode, minimal UI, panic button, user guidelines

**Poor User Adoption**

- Risk: Product doesn't resonate with users
- Mitigation: Beta testing, clear value prop, gather feedback early

### Medium Priority

**Browser Compatibility**

- Risk: Audio features don't work on all browsers
- Mitigation: Feature detection, graceful degradation, clear requirements

**Supabase Free Tier Limits**

- Risk: Exceed free tier limits
- Mitigation: Monitor usage, plan upgrade path, efficient queries

---

## Assumptions & Dependencies

### Critical Assumptions

**User Assumptions:**

1. Users have reliable internet connection (4G or better)
2. Users will grant microphone permission for interview assistant
3. Users are comfortable with AI-powered tools
4. Users have modern browsers (Chrome 90+, Safari 14+, Firefox 88+)
5. Users trust us with sensitive data (resumes, interview transcripts)

**Technical Assumptions:**

1. Google Gemini API remains stable and affordable
2. Supabase free tier sufficient for initial users (<500MB data, 1GB storage)
3. Web Audio API and Speech API supported in target browsers
4. Vercel free tier handles initial traffic (100GB/month bandwidth)
5. No breaking changes in Next.js 15, React 19 during development

**Business Assumptions:**

1. Market demand exists for AI-powered job search tools
2. Users will pay $20-50/month for premium features (future)
3. Product Hunt launch drives initial 500+ signups
4. Word-of-mouth growth is achievable with strong value
5. Compliance with GDPR/CCPA is manageable with Supabase

**Market Assumptions:**

1. Tech job market remains active (not in recession)
2. ATS systems continue to be a pain point for job seekers
3. Interview anxiety remains a common problem
4. Remote interviews continue to be standard practice

### External Dependencies

**Critical (Blockers if unavailable):**

| Dependency        | Purpose                                | Risk   | Mitigation                                              |
| ----------------- | -------------------------------------- | ------ | ------------------------------------------------------- |
| Google Gemini API | Resume analysis, interview suggestions | High   | Cache responses, implement fallbacks, budget monitoring |
| Supabase          | Database, auth, storage                | High   | Have migration plan to self-hosted PostgreSQL           |
| Vercel            | Hosting and deployment                 | Medium | Can migrate to AWS/Netlify if needed                    |
| Google OAuth      | User authentication                    | Medium | Add email/password auth as backup                       |

**Important (Degraded experience):**

| Dependency          | Purpose           | Risk   | Mitigation                            |
| ------------------- | ----------------- | ------ | ------------------------------------- |
| Web Audio API       | Audio capture     | Low    | Feature detection, clear requirements |
| Web Speech API      | Speech-to-text    | Medium | Use Gemini for text processing        |
| Browser Permissions | Microphone access | Low    | Clear instructions, help docs         |

**Budget Dependencies:**

- Google Gemini API: ~$50-200/month (estimated, cost-effective pricing)
- Supabase: $0-25/month (free tier initially, scale as needed)
- Vercel: $0-20/month (free tier initially)
- Domain: ~$12/year
- **Total: ~$0-250/month initially, scaling to $500+ with growth**

---

## Open Questions

### Product Questions (Need Answers)

**P0 (Before Launch):**

- ❓ **Ethics:** Is live interview assistance ethical? Should we add disclaimers?
  - _Current stance:_ User's personal tool, like notes or preparation
  - _Action:_ Add ethical guidelines, recommend disclosure for recorded interviews

- ❓ **Pricing:** Will users pay for this? What's the right price point?
  - _Hypothesis:_ $29/month for Pro tier
  - _Action:_ Validate with beta users, run pricing surveys

- ❓ **Privacy:** How do users feel about AI analyzing their interviews?
  - _Current plan:_ Local processing where possible, clear privacy policy
  - _Action:_ User testing, transparent data practices

**P1 (During MVP):**

- ❓ **Audio Quality:** Will browser-based audio capture work reliably?
  - _Test plan:_ Week 3 testing on multiple devices/browsers
- ❓ **AI Accuracy:** How accurate is resume scoring vs recruiter feedback?
  - _Validation:_ Compare AI scores with recruiter reviews, iterate prompts

- ❓ **Interview Detection:** Can we reliably detect questions in real-time?
  - _Test plan:_ Test with mock interviews, measure accuracy

**P2 (Can Figure Out Later):**

- ❓ **Monetization:** Freemium vs paid-only? Usage-based vs flat fee?
  - _Decision timeline:_ Month 4-6 after validating value

- ❓ **Scalability:** When do we need to upgrade from free tiers?
  - _Monitor:_ Usage metrics, set up alerts at 80% capacity

### Technical Questions

- ❓ **Real-time processing:** Can we achieve <100ms latency? → Test in Week 3
- ❓ **Mobile:** Will audio features work on mobile browsers? → Test Safari iOS, Chrome Android
- ❓ **AI prompts:** How to prevent prompt injection? → Implement input sanitization

### Decisions Needed By:

| Question                  | Deadline      | Owner  | Status             |
| ------------------------- | ------------- | ------ | ------------------ |
| Ethics guidelines         | Before launch | Saurav | Draft ready        |
| Privacy policy            | Before launch | Saurav | Need lawyer review |
| Audio latency feasibility | Day 17        | Saurav | Testing            |
| Beta pricing validation   | Day 25        | Saurav | Pending            |
| Terms of service          | Before launch | Saurav | Need lawyer        |

---

## Future Considerations

### Phase 3: Growth (Months 2-3)

- Mobile apps (iOS, Android)
- Chrome extension
- LinkedIn integration
- Advanced analytics

### Phase 4: Monetization (Months 4-6)

- **Free:** 5 jobs, 3 analyses
- **Pro ($29/mo):** Unlimited jobs, live assistant
- **Teams ($99/mo):** Team features, admin dashboard

### Phase 5: Advanced Features (Months 7-12)

- AI interview simulator
- Salary negotiation assistant
- Career path recommendations
- Job matching algorithm

---

## Glossary

- **ATS:** Applicant Tracking System - software that filters resumes
- **STAR Method:** Situation, Task, Action, Result - interview framework
- **RLS:** Row-Level Security - database security at row level
- **LCP:** Largest Contentful Paint - page load performance metric
- **NPS:** Net Promoter Score - customer satisfaction metric

---

## Appendix

### Data Model (Simplified)

**Users:** id, email, name, avatar, created_at  
**Jobs:** id, user_id, company, role, status, applied_date  
**Resumes:** id, user_id, job_id, file_path, uploaded_at  
**Analyses:** id, job_id, overall_score, strengths, improvements  
**Interviews:** id, job_id, transcript, performance_score

### API Endpoints (Key)

- `POST /api/auth/signin` - Google OAuth
- `GET /api/jobs` - List jobs
- `POST /api/resumes` - Upload resume
- `POST /api/ai/analyze-resume` - ATS scoring
- `POST /api/interviews` - Create session

---

**Document Status:** 🟢 Active  
**Next Review:** December 1, 2025

---

For questions or feedback, contact:  
**Saurav Kumar** - sk729584@gmail.com - [@Saurav02022](https://github.com/Saurav02022)
