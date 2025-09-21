# Day 5: Resume Template System 📄

## Previous Day Summary (Day 4)

**✅ Completed:**

- File upload system with drag-and-drop functionality for resumes
- AI-powered resume analysis with comprehensive ATS scoring
- Detailed scoring breakdown (keyword match, format, content quality)
- Actionable improvement suggestions with priority levels
- Resume version management and analysis history
- Mobile-optimized upload experience with performance optimization
- Integration with job workflow and progress tracking

**🎯 Ready to Start:** Resume template generation and customization system

---

## Overview

Build a comprehensive resume template generation system that creates ATS-optimized resumes using professional templates. Include PDF generation, LaTeX source code provision, template customization options, and seamless integration with the resume analysis system.

## Routes & UI Design

### 1. Templates Tab (`/jobs/[id]/templates`)

#### **UI Design Description:**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  ← Resume Review                  📄 Resume Templates - Google SWE              │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  [📋 Overview] [📝 Resume Review] [📄 Templates] [⚡ Live Assistant] [📊 Analytics]│
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    🎯 AI-Generated Resume Templates                     │   │
│  │                                                                         │   │
│  │  Based on your resume analysis (Score: 92/100) and Google's            │   │
│  │  requirements, we've generated optimized templates for you:             │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐    │
│  │    📄 Tech          │  │    📄 Executive     │  │    📄 Google        │    │
│  │    Modern           │  │    Professional     │  │    Optimized        │    │
│  │                     │  │                     │  │                     │    │
│  │  ⭐ Recommended      │  │  Clean & formal     │  │  🎯 Best for Google  │    │
│  │  for Google         │  │  design perfect     │  │  Includes all       │    │
│  │                     │  │  for senior roles   │  │  required keywords  │    │
│  │  • ATS Score: 95%   │  │                     │  │                     │    │
│  │  • Modern design    │  │  • ATS Score: 92%   │  │  • ATS Score: 98%   │    │
│  │  • Tech-focused     │  │  • Executive style  │  │  • Google-specific  │    │
│  │  • Clean layout     │  │  • Leadership focus │  │  • Perfect keywords │    │
│  │                     │  │                     │  │  • Optimized format │    │
│  │  [📄 Preview]       │  │  [📄 Preview]       │  │  [📄 Preview]       │    │
│  │  [📥 Download PDF]  │  │  [📥 Download PDF]  │  │  [📥 Download PDF]  │    │
│  │  [📝 Get LaTeX]     │  │  [📝 Get LaTeX]     │  │  [📝 Get LaTeX]     │    │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘    │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        📄 Template Preview                              │   │
│  │                                                                         │   │
│  │  Currently Viewing: Google Optimized Template                          │   │
│  │                                                                         │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                                 │   │   │
│  │  │                    SARAH CHEN                                   │   │   │
│  │  │              Senior Software Engineer                           │   │   │
│  │  │                                                                 │   │   │
│  │  │   📧 sarah@email.com  📱 (555) 123-4567  🔗 linkedin.com/in/sarah │   │   │
│  │  │                                                                 │   │   │
│  │  │   PROFESSIONAL SUMMARY                                          │   │   │
│  │  │   Senior Software Engineer with 6+ years building distributed  │   │   │
│  │  │   systems at scale. Expert in Java, Python, and microservices │   │   │
│  │  │   architecture serving 50M+ users. Passionate about building   │   │   │
│  │  │   systems that impact billions of users globally...            │   │   │
│  │  │                                                                 │   │   │
│  │  │   TECHNICAL SKILLS                                              │   │   │
│  │  │   • Languages: Java, Python, Go, JavaScript, SQL              │   │   │
│  │  │   • Systems: Distributed Systems, Microservices, Kubernetes   │   │   │
│  │  │   • Databases: MySQL, PostgreSQL, BigTable, Spanner          │   │   │
│  │  │   • Cloud: GCP, AWS, Docker, Kubernetes                       │   │   │
│  │  │                                                                 │   │   │
│  │  │   [Show Full Preview...]                                        │   │   │
│  │  └─────────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        📝 LaTeX Source Code                             │   │
│  │                                                                         │   │
│  │  Complete Overleaf-ready LaTeX source code for easy customization:     │   │
│  │                                                                         │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │   │
│  │  │ \documentclass[11pt,a4paper,sans]{moderncv}                    │   │   │
│  │  │ \moderncvstyle{banking}                                         │   │   │
│  │  │ \moderncvcolor{blue}                                            │   │   │
│  │  │                                                                 │   │   │
│  │  │ \usepackage[scale=0.75]{geometry}                               │   │   │
│  │  │                                                                 │   │   │
│  │  │ \name{Sarah}{Chen}                                              │   │   │
│  │  │ \title{Senior Software Engineer}                                │   │   │
│  │  │ \address{Mountain View, CA}                                     │   │   │
│  │  │ \phone[mobile]{+1~(555)~123~4567}                               │   │   │
│  │  │ \email{sarah@email.com}                                         │   │   │
│  │  │                                                                 │   │   │
│  │  │ \begin{document}                                                │   │   │
│  │  │ \makecvtitle                                                    │   │   │
│  │  │                                                                 │   │   │
│  │  │ [Show Full Code...]                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────────┘   │   │
│  │                                                                         │   │
│  │  [📋 Copy LaTeX Code] [📤 Open in Overleaf] [📥 Download .tex File]    │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                          🎯 Next Steps                                  │   │
│  │                                                                         │   │
│  │  1. ✅ Download your optimized resume PDF                               │   │
│  │  2. 📝 Customize using the LaTeX source in Overleaf                     │   │
│  │  3. 📧 Apply to Google with your new resume                             │   │
│  │  4. 📊 Update job status when you hear back                             │   │
│  │  5. ⚡ Use live assistant when you get the interview                     │   │
│  │                                                                         │   │
│  │                      [📧 Apply to Google Now]                           │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

#### **Features & Functionality:**

- **AI Template Generation**
  - Analyze resume content and job requirements
  - Generate 3 optimized template variants
  - Customize content for specific job/company
  - Predict ATS scores for each template
- **Template Selection**
  - Visual template previews
  - ATS score comparison
  - Feature highlighting (modern, executive, company-specific)
  - Recommendation engine
- **Preview System**
  - Full-size template preview
  - Multi-page document navigation
  - Zoom and scroll functionality
  - Side-by-side comparison
- **LaTeX Integration**
  - Complete LaTeX source code generation
  - Overleaf integration for editing
  - Syntax highlighting and formatting
  - Direct download of .tex files
- **PDF Generation**
  - High-quality PDF output
  - ATS-optimized formatting
  - Multiple format options
  - Instant download capability

### 2. Template Preview Modal

#### **UI Design Description:**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     📄 Template Preview - Google Optimized            [✕]      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  [🔍 Zoom: 100% ▼] [📄 Page 1 of 1] [⬅️ Prev] [Next ➡️]                        │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                         │   │
│  │                         SARAH CHEN                                      │   │
│  │                   Senior Software Engineer                              │   │
│  │                                                                         │   │
│  │     📧 sarah.chen@email.com | 📱 (555) 123-4567 | 🔗 linkedin.com/in/sarah │   │
│  │                        📍 Mountain View, CA                             │   │
│  │                                                                         │   │
│  │     PROFESSIONAL SUMMARY                                                │   │
│  │     ────────────────────────                                           │   │
│  │     Senior Software Engineer with 6+ years of experience building      │   │
│  │     distributed systems at scale. Expert in Java, Python, and          │   │
│  │     microservices architecture, with proven track record of            │   │
│  │     delivering systems serving 50M+ users. Passionate about            │   │
│  │     building technology that impacts billions of users globally.       │   │
│  │                                                                         │   │
│  │     TECHNICAL SKILLS                                                    │   │
│  │     ───────────────                                                     │   │
│  │     • Languages: Java, Python, Go, JavaScript, TypeScript, SQL         │   │
│  │     • Systems: Distributed Systems, Microservices, Kubernetes          │   │
│  │     • Databases: MySQL, PostgreSQL, BigTable, Spanner, Redis           │   │
│  │     • Cloud: Google Cloud Platform, AWS, Docker, Kubernetes            │   │
│  │     • Tools: Git, Jenkins, Terraform, Prometheus, Grafana              │   │
│  │                                                                         │   │
│  │     PROFESSIONAL EXPERIENCE                                             │   │
│  │     ──────────────────────                                              │   │
│  │                                                                         │   │
│  │     Senior Software Engineer | TechCorp Inc.        Nov 2020 - Present │   │
│  │     • Led end-to-end delivery of 3 internal products, managing         │   │
│  │       requirements, implementation, and deployment to accelerate       │   │
│  │       feature releases and improve delivery efficiency by 25%          │   │
│  │     • Developed and launched a Progressive Web App (PWA) - Saksham     │   │
│  │       AI Teacher Coach for Siksha Academy & Central School             │   │
│  │       Foundation; piloted by 100+ educators, achieving 200+            │   │
│  │       downloads and 95% positive feedback                              │   │
│  │     • Published an Android app (Saksham AI Teacher Coach) on the       │   │
│  │       Google Play Store using React Native + TypeScript in 60 days    │   │
│  │       (45 days development + 15 days internal testing), achieving      │   │
│  │       200+ downloads and 95% positive feedback                         │   │
│  │                                                                         │   │
│  │     [Continue reading...]                                               │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                          Template Features                              │   │
│  │                                                                         │   │
│  │  ✅ ATS Score: 98/100 (Excellent)                                      │   │
│  │  ✅ Google-specific keywords included                                   │   │
│  │  ✅ Clean, professional formatting                                     │   │
│  │  ✅ Perfect for senior engineering roles                               │   │
│  │  ✅ Optimized for distributed systems positions                        │   │
│  │                                                                         │   │
│  │  🎯 Why this template works for Google:                                │   │
│  │  • Emphasizes scalability and impact                                   │   │
│  │  • Includes specific Google technologies                               │   │
│  │  • Highlights leadership and mentorship                                │   │
│  │  • Shows quantified business impact                                    │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  [📥 Download PDF] [📝 Get LaTeX Code] [📤 Open in Overleaf] [🔄 Generate New] │
└─────────────────────────────────────────────────────────────────────────────────┘
```

#### **Features & Functionality:**

- **Interactive Preview**
  - Zoom controls (50%, 75%, 100%, 125%, 150%)
  - Multi-page navigation
  - Full-screen preview mode
  - Print preview option
- **Template Analysis**
  - Real-time ATS score display
  - Feature highlighting
  - Company-specific optimization notes
  - Comparison with other templates
- **Direct Actions**
  - Instant PDF download
  - LaTeX code access
  - Overleaf integration
  - Template regeneration

### 3. LaTeX Code Viewer

#### **UI Design Description:**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     📝 LaTeX Source Code - Google Template        [✕]          │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  [📋 Copy All] [📥 Download .tex] [📤 Open in Overleaf] [🔍 Search Code]        │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │   1  \documentclass[11pt,a4paper,sans]{moderncv}                       │   │
│  │   2  \moderncvstyle{banking}                                            │   │
│  │   3  \moderncvcolor{blue}                                               │   │
│  │   4                                                                     │   │
│  │   5  % Packages                                                         │   │
│  │   6  \usepackage[scale=0.75]{geometry}                                  │   │
│  │   7  \usepackage[utf8]{inputenc}                                        │   │
│  │   8                                                                     │   │
│  │   9  % Personal Information                                             │   │
│  │  10  \name{Sarah}{Chen}                                                 │   │
│  │  11  \title{Senior Software Engineer}                                   │   │
│  │  12  \address{Mountain View, CA}                                        │   │
│  │  13  \phone[mobile]{+1~(555)~123~4567}                                  │   │
│  │  14  \email{sarah.chen@email.com}                                       │   │
│  │  15  \social[linkedin]{sarah-chen}                                      │   │
│  │  16                                                                     │   │
│  │  17  \begin{document}                                                   │   │
│  │  18  \makecvtitle                                                       │   │
│  │  19                                                                     │   │
│  │  20  % Professional Summary                                             │   │
│  │  21  \section{Professional Summary}                                     │   │
│  │  22  \cvitem{}{Senior Software Engineer with 6+ years of experience    │   │
│  │  23  building distributed systems at scale. Expert in Java, Python,    │   │
│  │  24  and microservices architecture, with proven track record of       │   │
│  │  25  delivering systems serving 50M+ users. Passionate about building  │   │
│  │  26  technology that impacts billions of users globally.}              │   │
│  │  27                                                                     │   │
│  │  28  % Technical Skills                                                 │   │
│  │  29  \section{Technical Skills}                                         │   │
│  │  30  \cvitem{Languages}{Java, Python, Go, JavaScript, TypeScript, SQL} │   │
│  │  31  \cvitem{Systems}{Distributed Systems, Microservices, Kubernetes}  │   │
│  │  32  \cvitem{Databases}{MySQL, PostgreSQL, BigTable, Spanner, Redis}   │   │
│  │  33  \cvitem{Cloud}{Google Cloud Platform, AWS, Docker, Kubernetes}    │   │
│  │  34                                                                     │   │
│  │  35  % Professional Experience                                          │   │
│  │  36  \section{Professional Experience}                                  │   │
│  │  37                                                                     │   │
│  │  38  \cventry{Nov 2020 -- Present}{Senior Software Engineer}{TechCorp  │   │
│  │  39  Inc.}{}{}{                                                         │   │
│  │  40  \begin{itemize}                                                    │   │
│  │  41  \item Led end-to-end delivery of 3 internal products, managing    │   │
│  │  42  requirements, implementation, and deployment to accelerate feature │   │
│  │  43  releases and improve delivery efficiency by 25\%                  │   │
│  │  44  \item Developed and launched a Progressive Web App (PWA) serving  │   │
│  │  45  100+ educators with 200+ downloads and 95\% positive feedback     │   │
│  │  46  \end{itemize}                                                      │   │
│  │  47  }                                                                  │   │
│  │  48                                                                     │   │
│  │  49  [Show More...]                                                     │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                          📚 Template Instructions                       │   │
│  │                                                                         │   │
│  │  🎯 How to use this LaTeX template:                                     │   │
│  │                                                                         │   │
│  │  1. 📤 Open in Overleaf (recommended) or download .tex file             │   │
│  │  2. 📝 Customize your personal information (lines 10-15)                │   │
│  │  3. ✏️  Edit sections to match your experience                          │   │
│  │  4. 🎨 Adjust colors and styling if needed                              │   │
│  │  5. 📄 Compile to generate your optimized PDF                           │   │
│  │                                                                         │   │
│  │  💡 Pro Tips:                                                           │   │
│  │  • Keep the structure for ATS compatibility                             │   │
│  │  • Maintain consistent formatting throughout                            │   │
│  │  • Use quantified achievements where possible                           │   │
│  │  • Include keywords from the job description                            │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│                    [📋 Copy Selected] [📥 Download File]                        │
└─────────────────────────────────────────────────────────────────────────────────┘
```

#### **Features & Functionality:**

- **Code Display**
  - Syntax highlighting for LaTeX
  - Line numbers and formatting
  - Search and navigation
  - Code folding for sections
- **Interactive Features**
  - Copy entire code or selections
  - Direct Overleaf integration
  - Download .tex file
  - Code search functionality
- **Documentation**
  - Inline comments explaining sections
  - Customization instructions
  - Best practices and tips
  - ATS optimization notes

## Components to Build

### Template Management Components

#### `TemplateGrid.tsx`

- **Purpose**: Display available template options
- **Features**:
  - Template preview cards
  - ATS score comparison
  - Recommendation badges
  - Filter and sort options
- **Props**: `templates: Template[]`, `selectedTemplate?`, `onSelect`
- **State**: Selected template, loading states

#### `TemplateCard.tsx`

- **Purpose**: Individual template display
- **Features**:
  - Template preview thumbnail
  - ATS score and features
  - Action buttons (Preview, Download, LaTeX)
  - Recommendation indicators
- **Props**: `template: Template`, `isRecommended?`, `onAction`
- **Interactive**: Preview, download, generate actions

#### `TemplatePreview.tsx`

- **Purpose**: Full template preview modal
- **Features**:
  - Zoomable document viewer
  - Multi-page navigation
  - Template feature highlights
  - Direct action buttons
- **Props**: `isOpen`, `template: Template`, `onClose`, `onAction`
- **State**: Zoom level, current page, loading

### Code Display Components

#### `LaTeXDisplay.tsx`

- **Purpose**: LaTeX source code viewer
- **Features**:
  - Syntax highlighting
  - Line numbers
  - Code search and navigation
  - Copy functionality
- **Props**: `code: string`, `language: 'latex'`, `showLineNumbers?: boolean`
- **State**: Search query, selected text

#### `CodeActions.tsx`

- **Purpose**: Actions for code manipulation
- **Features**:
  - Copy to clipboard
  - Download file
  - Open in Overleaf
  - Code formatting
- **Props**: `code: string`, `filename: string`, `onAction`
- **Interactive**: Copy, download, external links

### Generation Components

#### `TemplateGenerator.tsx`

- **Purpose**: AI template generation engine
- **Features**:
  - Generate templates from resume data
  - Customize for specific job/company
  - Multiple template variants
  - Progress tracking
- **Props**: `resumeData`, `jobData`, `onGenerated`
- **State**: Generation progress, errors

#### `CustomizationPanel.tsx`

- **Purpose**: Template customization options
- **Features**:
  - Color scheme selection
  - Font and layout options
  - Section ordering
  - Content toggles
- **Props**: `template: Template`, `onCustomize`
- **State**: Customization settings

### PDF Generation Components

#### `PDFGenerator.tsx`

- **Purpose**: PDF creation and download
- **Features**:
  - High-quality PDF generation
  - Multiple format options
  - Progress indication
  - Error handling
- **Props**: `templateData`, `format: 'a4' | 'letter'`, `onGenerated`
- **State**: Generation progress, download ready

#### `DownloadManager.tsx`

- **Purpose**: Handle file downloads
- **Features**:
  - PDF and LaTeX downloads
  - Progress tracking
  - Error handling
  - Download history
- **Props**: `files: DownloadFile[]`, `onDownload`
- **State**: Download progress, completed downloads

## Technical Implementation

### Technical Implementation Notes

- **Data Models**: Template structure with customization options, ATS scoring, and LaTeX integration
- **Template Generation**: AI-powered template creation with multiple variants and company-specific optimization
- **PDF Generation**: LaTeX to PDF compilation with ATS optimization and quality assurance
- **Overleaf Integration**: Direct integration for template editing and customization
- **API Routes**: Template generation, PDF compilation, and download management endpoints

## shadcn/ui Components Used

### Layout & Display

- `Card` - Template cards, preview containers
- `Tabs` - Template categories, code sections
- `Badge` - ATS scores, recommendations
- `Separator` - Section dividers
- `ScrollArea` - Long content areas

### Interactive Elements

- `Button` - Actions (download, preview, generate)
- `Dialog` - Preview modals, code viewers
- `Sheet` - Side panels for customization
- `Select` - Customization options
- `Slider` - Zoom controls, customization values

### Code & Text

- `Textarea` - LaTeX code editing
- `Input` - Search, customization inputs
- `Label` - Form labels
- `Tooltip` - Help text and explanations

### Feedback & States

- `Progress` - Generation progress, downloads
- `Alert` - Success messages, warnings
- `Toast` - Download confirmations
- `Skeleton` - Loading states

## Responsive Design

### Mobile Layout (< 768px)

- Stack template cards vertically
- Simplified preview with swipe navigation
- Touch-friendly action buttons
- Collapsible code sections
- Mobile-optimized modals

### Tablet Layout (768px - 1024px)

- Two-column template grid
- Maintain full preview functionality
- Touch-optimized controls
- Responsive modal sizing

### Desktop Layout (> 1024px)

- Three-column template grid
- Side-by-side preview and code
- Hover states and tooltips
- Keyboard shortcuts for actions

## Day 5 Checklist

### Setup Tasks

- [ ] Set up LaTeX compilation service or API
- [ ] Configure PDF generation infrastructure
- [ ] Set up file storage for templates and PDFs
- [ ] Create template generation data models

### Component Development

- [ ] Build TemplateGrid with template selection
- [ ] Create TemplateCard with preview and actions
- [ ] Develop TemplatePreview modal with zoom
- [ ] Build LaTeXDisplay with syntax highlighting
- [ ] Create PDFGenerator with optimization
- [ ] Develop CustomizationPanel for template options

### AI Integration

- [ ] Implement template generation algorithms
- [ ] Build LaTeX code generation with AI
- [ ] Create ATS score prediction for templates
- [ ] Add company-specific customization logic

### File Generation

- [ ] Set up LaTeX to PDF compilation
- [ ] Implement PDF optimization for ATS
- [ ] Create download management system
- [ ] Add Overleaf integration links

### Testing & Validation

- [ ] Test template generation with various inputs
- [ ] Verify PDF quality and ATS compatibility
- [ ] Test LaTeX code compilation
- [ ] Validate download functionality across browsers
- [ ] Check responsive design on all devices

## Success Criteria

- [ ] Templates generate within 15 seconds
- [ ] PDFs are high-quality and ATS-compatible
- [ ] LaTeX code compiles successfully in Overleaf
- [ ] All downloads work across different browsers
- [ ] Template previews are accurate and zoomable
- [ ] Mobile experience is fully functional
- [ ] Generated templates score 90%+ on ATS tests
- [ ] Customization options work correctly
