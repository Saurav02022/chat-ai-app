# JobCraft AI Design System

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Maintained by:** Engineering & Design Team

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Foundation](#foundation)
   - [Design Principles](#design-principles)
   - [Design Tokens](#design-tokens)
4. [Components](#components)
5. [Patterns](#patterns)
6. [Content](#content)
7. [Accessibility](#accessibility)
8. [Contributing](#contributing)
9. [Resources](#resources)

---

## Introduction

### What is a Design System?

The JobCraft AI Design System is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. It includes:

- **Design tokens**: Foundational design decisions (colors, typography, spacing)
- **Components**: Reusable UI elements with clear APIs
- **Patterns**: Best practices for common user flows
- **Guidelines**: Standards for design and development

### Why Use This System?

**For Designers:**

- Spend less time on repetitive UI decisions
- Focus on solving user problems
- Ensure consistency across products

**For Developers:**

- Pre-built, tested components
- Reduced development time
- Consistent implementation

**For the Business:**

- Faster time to market
- Consistent brand experience
- Reduced technical debt

### Who This Is For

- Product Designers
- Frontend Engineers
- Product Managers
- Content Designers
- QA Engineers

---

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```

### Quick Start

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function MyComponent() {
  return (
    <Card>
      <h2>Hello World</h2>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Card>
  );
}
```

### Tech Stack

| Technology    | Version | Purpose               |
| ------------- | ------- | --------------------- |
| Next.js       | 15.0.3  | Application framework |
| TypeScript    | 5.x     | Type safety           |
| Tailwind CSS  | 3.4.1   | Styling               |
| Shadcn/ui     | Latest  | Component foundation  |
| Framer Motion | 11.x    | Animations            |
| Lucide React  | Latest  | Icons                 |

### Browser Support

| Browser | Version |
| ------- | ------- |
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

---

## Foundation

### Design Principles

#### 1. User-Centered

Every design decision is made with the user in mind. We prioritize:

- Clear information hierarchy
- Task-oriented workflows
- Intuitive interactions
- Reduced cognitive load

**Example:** Our job application flow is a single-page form rather than multiple steps to reduce friction.

#### 2. Accessible

Accessibility is not an afterthought—it's built into every component by default.

- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast

**Example:** All form inputs have visible labels and error states that work with assistive technologies.

#### 3. Consistent

Consistency reduces the learning curve and builds user confidence.

- Unified visual language
- Predictable interactions
- Systematic naming
- Standardized patterns

**Example:** Primary actions always use the same blue color (`#3B82F6`) across all interfaces.

#### 4. Efficient

Design efficiently to respect users' time and cognitive resources.

- Fast load times
- Smooth animations (60fps)
- Minimal clicks to complete tasks
- Clear feedback loops

**Example:** Form validation happens in real-time to prevent submission errors.

#### 5. Scalable

The system grows with the product without breaking existing implementations.

- Versioned components
- Backward compatibility
- Extensible architecture
- Clear deprecation paths

**Example:** New component variants can be added without affecting existing usage.

---

### Design Tokens

Design tokens are the foundational design decisions of our system. They are platform-agnostic values that define visual design decisions.

#### Color

##### Brand Colors

| Token        | Value     | RGB            | Usage                  | Example                                                     |
| ------------ | --------- | -------------- | ---------------------- | ----------------------------------------------------------- |
| `blue-500`   | `#3B82F6` | `59, 130, 246` | Primary actions, links | ![#3B82F6](https://via.placeholder.com/30x20/3B82F6/3B82F6) |
| `blue-600`   | `#2563EB` | `37, 99, 235`  | Primary hover states   | ![#2563EB](https://via.placeholder.com/30x20/2563EB/2563EB) |
| `purple-500` | `#8B5CF6` | `139, 92, 246` | Accent, highlights     | ![#8B5CF6](https://via.placeholder.com/30x20/8B5CF6/8B5CF6) |
| `purple-600` | `#7C3AED` | `124, 58, 237` | Accent hover states    | ![#7C3AED](https://via.placeholder.com/30x20/7C3AED/7C3AED) |

##### Semantic Colors

| Token        | Value     | Usage          | When to Use                           |
| ------------ | --------- | -------------- | ------------------------------------- |
| `green-500`  | `#10B981` | Success states | Completed actions, positive feedback  |
| `yellow-500` | `#F59E0B` | Warning states | Caution messages, non-critical issues |
| `red-500`    | `#EF4444` | Error states   | Failures, destructive actions         |
| `blue-500`   | `#3B82F6` | Informational  | Helpful tips, neutral information     |

##### Neutral Scale

| Token      | Value     | Usage                       |
| ---------- | --------- | --------------------------- |
| `gray-50`  | `#F9FAFB` | Page backgrounds            |
| `gray-100` | `#F3F4F6` | Card backgrounds            |
| `gray-200` | `#E5E7EB` | Borders, dividers           |
| `gray-500` | `#6B7280` | Disabled text, placeholders |
| `gray-700` | `#374151` | Secondary text              |
| `gray-900` | `#111827` | Primary text, headings      |

##### Accessibility

All color combinations meet WCAG 2.1 AA standards:

| Foreground | Background | Ratio  | Pass   |
| ---------- | ---------- | ------ | ------ |
| `gray-900` | `white`    | 16.7:1 | ✅ AAA |
| `gray-700` | `white`    | 7.5:1  | ✅ AAA |
| `blue-500` | `white`    | 4.6:1  | ✅ AA  |
| `gray-500` | `white`    | 4.6:1  | ✅ AA  |

**Do:**

- Use `gray-900` for primary text on light backgrounds
- Use `gray-700` for secondary text
- Use `blue-500` for interactive elements

**Don't:**

- Use `gray-500` for body text (use for secondary elements only)
- Use `gray-300` for text (insufficient contrast)
- Rely on color alone to convey information

##### Implementation

```tsx
// Using Tailwind classes
<div className="bg-blue-500 text-white">Primary Action</div>
<p className="text-gray-700">Secondary text</p>

// Using CSS variables
:root {
  --color-primary: 59 130 246;
  --color-text: 17 24 39;
}

.custom-element {
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-text));
}
```

#### Typography

##### Font Families

| Name     | Family     | Usage                   | Fallback                             |
| -------- | ---------- | ----------------------- | ------------------------------------ |
| **Sans** | Geist Sans | UI text, headings       | system-ui, -apple-system, sans-serif |
| **Mono** | Geist Mono | Code, technical content | Monaco, Courier New, monospace       |

##### Type Scale

| Token        | Size            | Line Height | Letter Spacing | Weight | Usage                |
| ------------ | --------------- | ----------- | -------------- | ------ | -------------------- |
| `heading-xl` | 72px / 4.5rem   | 1.1         | -0.02em        | 700    | Hero headlines       |
| `heading-lg` | 48px / 3rem     | 1.2         | -0.01em        | 700    | Page titles          |
| `heading-md` | 32px / 2rem     | 1.25        | -0.01em        | 700    | Section headers      |
| `heading-sm` | 24px / 1.5rem   | 1.3         | 0              | 600    | Card titles          |
| `heading-xs` | 20px / 1.25rem  | 1.3         | 0              | 600    | Subsection headers   |
| `body-lg`    | 18px / 1.125rem | 1.5         | 0              | 400    | Lead paragraphs      |
| `body-md`    | 16px / 1rem     | 1.5         | 0              | 400    | Default body text    |
| `body-sm`    | 14px / 0.875rem | 1.4         | 0              | 400    | Captions, small text |
| `body-xs`    | 12px / 0.75rem  | 1.3         | 0              | 400    | Labels, metadata     |

##### Responsive Typography

```css
/* Desktop */
.heading-xl {
  font-size: 4.5rem; /* 72px */
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Tablet (768px and below) */
@media (max-width: 768px) {
  .heading-xl {
    font-size: 3rem; /* 48px */
  }
}

/* Mobile (640px and below) */
@media (max-width: 640px) {
  .heading-xl {
    font-size: 2.5rem; /* 40px */
  }
}
```

##### Implementation

```tsx
// Using Tailwind classes
<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
  Hero Headline
</h1>

<p className="text-base text-gray-700 leading-relaxed">
  Body text with proper line height
</p>

// Using semantic HTML
<article>
  <h1>Main Title</h1>
  <h2>Section Title</h2>
  <p>Paragraph text</p>
</article>
```

**Do:**

- Use semantic HTML elements (`h1`, `h2`, `p`)
- Maintain proper heading hierarchy
- Set line-height for readability (1.5 for body text)
- Use responsive font sizes

**Don't:**

- Skip heading levels (h1 → h3)
- Use more than 3 font weights in one view
- Set line-height below 1.3
- Use font sizes smaller than 14px for body text

#### Spacing

##### Spacing Scale

| Token      | Value   | Pixels | Usage            |
| ---------- | ------- | ------ | ---------------- |
| `space-0`  | 0       | 0px    | No spacing       |
| `space-1`  | 0.25rem | 4px    | Fine adjustments |
| `space-2`  | 0.5rem  | 8px    | Tight spacing    |
| `space-3`  | 0.75rem | 12px   | Small gaps       |
| `space-4`  | 1rem    | 16px   | Default spacing  |
| `space-6`  | 1.5rem  | 24px   | Medium spacing   |
| `space-8`  | 2rem    | 32px   | Large spacing    |
| `space-12` | 3rem    | 48px   | Section spacing  |
| `space-16` | 4rem    | 64px   | Large sections   |
| `space-24` | 6rem    | 96px   | Page sections    |

##### Layout Guidelines

```tsx
// Section spacing
<section className="py-16 md:py-24">  // 64px → 96px
  <div className="container">
    <div className="space-y-8">  // 32px between children
      <h2 className="mb-4">Title</h2>  // 16px below
      <p>Content</p>
    </div>
  </div>
</section>

// Component spacing
<Card className="p-6">  // 24px padding
  <CardHeader className="mb-4">  // 16px below header
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">  // 8px between elements
      <p>Line 1</p>
      <p>Line 2</p>
    </div>
  </CardContent>
</Card>
```

##### Container System

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
}

@media (min-width: 640px) {
  .container {
    padding-left: 2rem; /* 32px */
    padding-right: 2rem; /* 32px */
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 4rem; /* 64px */
    padding-right: 4rem; /* 64px */
  }
}
```

**Do:**

- Use multiples of 4px for spacing
- Be consistent with section spacing (`py-16 md:py-24`)
- Use container class for all page content
- Stack spacing increases with viewport size

**Don't:**

- Use arbitrary values (`mt-[23px]`)
- Mix spacing units (rem, px, em)
- Create inconsistent spacing patterns
- Use negative margin for layout

#### Elevation (Shadows)

| Level       | Value                         | Usage                         |
| ----------- | ----------------------------- | ----------------------------- |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)`  | Subtle elevation, form inputs |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1)`   | Cards, dropdowns              |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, popovers              |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Overlays, important elements  |

```tsx
// Card with elevation
<Card className="shadow-md hover:shadow-lg transition-shadow">
  Card content
</Card>
```

#### Border Radius

| Token          | Value  | Usage                             |
| -------------- | ------ | --------------------------------- |
| `rounded-sm`   | 2px    | Small elements, badges            |
| `rounded-md`   | 6px    | Buttons, inputs                   |
| `rounded-lg`   | 8px    | Cards, containers                 |
| `rounded-xl`   | 12px   | Feature cards, images             |
| `rounded-2xl`  | 16px   | Hero sections, large cards        |
| `rounded-full` | 9999px | Avatars, pills, circular elements |

---

## Components

### Component Documentation Structure

Each component follows this documentation pattern:

1. **Overview**: What the component does
2. **Variants**: Different versions available
3. **Usage**: When and how to use it
4. **Anatomy**: Component structure
5. **Props API**: Available properties
6. **Examples**: Code examples
7. **Accessibility**: Keyboard support and ARIA
8. **Do's and Don'ts**: Best practices

---

### Button

Primary interactive element for user actions.

#### Overview

Buttons allow users to perform actions and make choices with a single tap or click. They communicate actions that will occur when clicked.

#### When to Use

- Primary actions (Submit, Save, Continue)
- Secondary actions (Cancel, Back)
- Tertiary actions (Learn More, Details)
- Destructive actions (Delete, Remove)

#### When Not to Use

- Navigation between pages (use Link instead)
- Toggle states (use Switch or Checkbox)
- Multiple selections (use Checkbox group)

#### Variants

| Variant         | Usage               | Visual                              |
| --------------- | ------------------- | ----------------------------------- |
| **Primary**     | Main call-to-action | Solid blue background, white text   |
| **Secondary**   | Secondary actions   | White background, blue border       |
| **Outline**     | Tertiary actions    | Transparent background, gray border |
| **Ghost**       | Subtle actions      | No background, text only            |
| **Destructive** | Dangerous actions   | Red background or red text          |

#### Sizes

| Size | Height | Padding   | Font Size | Usage                         |
| ---- | ------ | --------- | --------- | ----------------------------- |
| `sm` | 32px   | 12px 16px | 14px      | Compact interfaces, tables    |
| `md` | 40px   | 16px 20px | 16px      | Default size, most common     |
| `lg` | 48px   | 20px 24px | 18px      | Hero sections, prominent CTAs |

#### Anatomy

```tsx
<Button>
  {icon && <Icon />} // Optional leading icon
  <span>{children}</span> // Button text (required)
  {loading && <Spinner />} // Optional loading state
</Button>
```

#### Props API

```typescript
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}
```

#### Examples

```tsx
// Primary button
<Button variant="default" size="lg">
  Get Started
</Button>

// Secondary with icon
<Button variant="outline" icon={<Download />}>
  Download Resume
</Button>

// Loading state
<Button loading disabled>
  Processing...
</Button>

// Destructive action
<Button variant="destructive">
  Delete Account
</Button>
```

#### States

| State    | Visual                            | Behavior            |
| -------- | --------------------------------- | ------------------- |
| Default  | Normal appearance                 | Clickable           |
| Hover    | Slight scale (1.02), darker color | Shows interactivity |
| Focus    | Blue outline ring                 | Keyboard navigation |
| Active   | Slight scale (0.98)               | Click feedback      |
| Disabled | Reduced opacity (50%), gray       | Not clickable       |
| Loading  | Spinner, disabled                 | Action in progress  |

#### Accessibility

- **Role**: `button`
- **Keyboard**:
  - `Space` or `Enter` to activate
  - `Tab` to focus
- **Screen reader**: Announces button text and state
- **Focus**: Visible focus ring
- **ARIA**: `aria-disabled` when disabled, `aria-busy` when loading

```tsx
<Button
  aria-label="Close dialog"
  disabled={isProcessing}
  aria-busy={isProcessing}
>
  {isProcessing ? 'Processing...' : 'Submit'}
</Button>
```

#### Do's and Don'ts

**Do:**

- ✅ Use clear, action-oriented text ("Save Changes" not "OK")
- ✅ Provide feedback for loading states
- ✅ Use primary variant sparingly (1-2 per page)
- ✅ Maintain consistent button sizes within the same context

**Don't:**

- ❌ Use more than one primary button in a section
- ❌ Use vague text like "Click Here" or "Submit"
- ❌ Make buttons too small (minimum 32px height)
- ❌ Disable buttons without explanation

---

### Card

Container component for grouping related content.

#### Overview

Cards contain content and actions about a single subject. They provide structure and make content easier to scan.

#### When to Use

- Displaying features or benefits
- Job listings or opportunities
- User profiles or summaries
- Dashboard widgets

#### When Not to Use

- Page-level containers (use sections)
- Simple lists (use list elements)
- Full-page content (use proper layout)

#### Anatomy

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Main content</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>
```

#### Variants

```tsx
// Default card
<Card className="p-6">
  <h3>Basic Card</h3>
  <p>Content here</p>
</Card>

// Interactive card (clickable)
<Card className="hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer">
  <CardHeader>
    <CardTitle>Feature</CardTitle>
  </CardHeader>
</Card>

// Featured card (highlighted)
<Card className="border-2 border-blue-500 bg-blue-50">
  <CardHeader>
    <CardTitle>Premium Feature</CardTitle>
  </CardHeader>
</Card>
```

#### Accessibility

- Use semantic HTML within cards
- Ensure sufficient color contrast
- Make interactive cards keyboard accessible
- Provide clear focus states

---

### Form Controls

#### Input

Text input fields for user data entry.

**Anatomy:**

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email address</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    aria-describedby="email-help"
  />
  <p id="email-help" className="text-sm text-gray-500">
    We'll never share your email
  </p>
</div>
```

**States:**

| State    | Visual            | Behavior       |
| -------- | ----------------- | -------------- |
| Default  | Gray border       | Awaiting input |
| Focus    | Blue border, ring | Active input   |
| Error    | Red border        | Invalid input  |
| Disabled | Gray background   | Not editable   |
| Success  | Green border      | Valid input    |

**Props:**

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: ChangeEvent) => void;
}
```

**Accessibility:**

- Always provide a visible label
- Use `aria-describedby` for help text
- Use `aria-invalid` and `aria-errormessage` for errors
- Support keyboard navigation

---

## Patterns

### Page Layout

Standard page structure for consistency across the application.

```tsx
<div className="min-h-screen flex flex-col">
  {/* Header */}
  <Header />

  {/* Main Content */}
  <main className="flex-1">
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">{/* Page content */}</div>
      </div>
    </section>
  </main>

  {/* Footer */}
  <Footer />
</div>
```

### Form Patterns

#### Simple Form

```tsx
<form onSubmit={handleSubmit}>
  <div className="space-y-6">
    <div>
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" required />
    </div>

    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" required />
    </div>

    <div className="flex gap-4">
      <Button type="submit" variant="default">
        Submit
      </Button>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </div>
</form>
```

#### Form Validation

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    aria-invalid={!!error}
    aria-describedby={error ? 'email-error' : undefined}
    className={error ? 'border-red-500' : ''}
  />
  {error && (
    <p id="email-error" className="text-sm text-red-600" role="alert">
      {error}
    </p>
  )}
</div>
```

### Loading States

```tsx
// Skeleton loading
<div className="space-y-4 animate-pulse">
  <div className="h-8 bg-gray-200 rounded w-3/4" />
  <div className="h-4 bg-gray-200 rounded w-full" />
  <div className="h-4 bg-gray-200 rounded w-5/6" />
</div>

// Spinner loading
<div className="flex items-center justify-center p-8">
  <Spinner className="h-8 w-8" />
  <span className="ml-3">Loading...</span>
</div>
```

### Empty States

```tsx
<div className="text-center py-16">
  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
    <Inbox className="h-8 w-8 text-gray-400" />
  </div>
  <h3 className="text-lg font-semibold mb-2">No jobs yet</h3>
  <p className="text-gray-600 mb-6">
    Start applying to jobs to track your applications here
  </p>
  <Button>Browse Jobs</Button>
</div>
```

---

## Content

### Writing Guidelines

#### Voice and Tone

**Voice (What we say):**

- Professional but approachable
- Empowering and supportive
- Clear and concise
- Human, not robotic

**Tone (How we say it):**

- **Success messages**: Encouraging and positive
- **Errors**: Helpful and solution-oriented
- **Instructions**: Clear and directive
- **Marketing**: Inspiring and aspirational

#### Examples

**Do:**

- ✅ "Your resume has been optimized for ATS systems"
- ✅ "We couldn't save your changes. Please try again."
- ✅ "Get personalized interview coaching"

**Don't:**

- ❌ "Resume optimization complete. Exit code: 0"
- ❌ "Error 500: Internal Server Error"
- ❌ "Click here to access features"

#### Button Text

- Use verbs: "Save Changes", "Download Resume", "Start Interview"
- Be specific: "Save Draft" not "Save"
- Keep it short: 1-3 words when possible
- Use sentence case: "Get started" not "Get Started"

#### Error Messages

Structure: [What happened] + [Why it happened] + [How to fix it]

**Examples:**

- "We couldn't upload your file because it's larger than 10MB. Try compressing it first."
- "This email is already registered. Try signing in instead."

---

## Accessibility

### WCAG 2.1 AA Compliance

All components must meet WCAG 2.1 Level AA standards.

### Color Contrast

#### Text Contrast

| Text Size            | Required Ratio | Example             |
| -------------------- | -------------- | ------------------- |
| Normal text (< 18px) | 4.5:1          | `gray-900` on white |
| Large text (≥ 18px)  | 3:1            | `gray-700` on white |
| UI components        | 3:1            | Blue buttons        |

#### Testing

```bash
# Use browser DevTools
1. Inspect element
2. Open "Accessibility" panel
3. Check "Contrast" section
```

### Keyboard Navigation

All interactive elements must be keyboard accessible:

| Key           | Action                              |
| ------------- | ----------------------------------- |
| `Tab`         | Move focus forward                  |
| `Shift + Tab` | Move focus backward                 |
| `Enter`       | Activate buttons, links             |
| `Space`       | Activate buttons, toggle checkboxes |
| `Escape`      | Close modals, dropdowns             |
| `Arrow keys`  | Navigate menus, radio groups        |

### Focus Management

```tsx
// Visible focus indicator
<Button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
  Accessible Button
</Button>

// Skip to main content
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600"
>
  Skip to main content
</a>

// Main content landmark
<main id="main-content">
  {/* Page content */}
</main>
```

### ARIA Labels

```tsx
// Icon-only button
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>
</Button>

// Form with error
<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    aria-invalid={hasError}
    aria-describedby="email-error"
  />
  {hasError && (
    <p id="email-error" role="alert">
      Please enter a valid email
    </p>
  )}
</div>

// Loading state
<div role="status" aria-live="polite">
  <Spinner />
  <span className="sr-only">Loading content...</span>
</div>
```

### Screen Reader Testing

Test with:

- **NVDA** (Windows) - Free
- **JAWS** (Windows) - Commercial
- **VoiceOver** (macOS/iOS) - Built-in
- **TalkBack** (Android) - Built-in

### Semantic HTML

Always use semantic HTML elements:

```tsx
// ✅ Good
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>

<footer>
  <p>&copy; 2024</p>
</footer>

// ❌ Bad
<div className="header">
  <div className="nav">
    <div className="link">Home</div>
  </div>
</div>
```

---

## Contributing

### How to Contribute

1. **Propose Changes**
   - Open an issue describing the problem
   - Suggest a solution
   - Provide examples or mockups

2. **Component Requests**
   - Check if similar component exists
   - Describe use case
   - Provide design specifications

3. **Bug Reports**
   - Component name and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Development Workflow

```bash
# 1. Create a branch
git checkout -b feature/new-component

# 2. Make changes
# ... edit files ...

# 3. Test your changes
npm run test
npm run lint

# 4. Build
npm run build

# 5. Submit PR
git push origin feature/new-component
```

### Component Checklist

Before submitting a component:

- [ ] **Design**
  - [ ] Follows design token system
  - [ ] Consistent with existing components
  - [ ] Responsive design
  - [ ] Dark mode support (if applicable)

- [ ] **Code Quality**
  - [ ] TypeScript types defined
  - [ ] Props interface documented
  - [ ] No linter errors
  - [ ] Follows naming conventions

- [ ] **Accessibility**
  - [ ] WCAG 2.1 AA compliant
  - [ ] Keyboard navigation works
  - [ ] Screen reader friendly
  - [ ] Focus indicators visible
  - [ ] Color contrast meets standards

- [ ] **Documentation**
  - [ ] Component overview written
  - [ ] Usage examples provided
  - [ ] Props API documented
  - [ ] Accessibility notes included

- [ ] **Testing**
  - [ ] Unit tests written
  - [ ] Tested on Chrome, Firefox, Safari
  - [ ] Tested on mobile devices
  - [ ] Tested with keyboard only
  - [ ] Tested with screen reader

### Design Tokens

To add or modify design tokens:

1. Update `tailwind.config.ts`
2. Document in this file
3. Provide usage examples
4. Test across components
5. Get design team approval

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Major (1.0.0)**: Breaking changes
- **Minor (0.1.0)**: New features, backward compatible
- **Patch (0.0.1)**: Bug fixes, backward compatible

---

## Resources

### Design Tools

- **Figma**: [Design files](https://figma.com)
- **Storybook**: Component library (coming soon)
- **Chromatic**: Visual testing (coming soon)

### Development Tools

- **GitHub**: [Repository](https://github.com/yourorg/jobcraft)
- **npm**: Package manager
- **TypeScript**: Type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting

### External References

- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://react.dev/learn/accessibility)
- [MDN Web Docs](https://developer.mozilla.org/)

### Inspiration

- [IBM Carbon Design System](https://carbondesignsystem.com/)
- [Material Design](https://m3.material.io/)
- [Shopify Polaris](https://polaris.shopify.com/)
- [Atlassian Design System](https://atlassian.design/)
- [GitHub Primer](https://primer.style/)

---

## Support

### Questions?

- **Slack**: #design-system
- **Email**: design-system@jobcraft.ai
- **GitHub Issues**: [Report bugs or request features](https://github.com/yourorg/jobcraft/issues)

### Office Hours

- **Design Team**: Tuesdays, 2-3 PM
- **Engineering Team**: Thursdays, 10-11 AM

---

## Changelog

### Version 1.0.0 - December 2024

**Added:**

- Initial design system documentation
- Core components (Button, Card, Input)
- Design tokens (Color, Typography, Spacing)
- Accessibility guidelines
- Component patterns
- Contributing guidelines

---

_This design system is a living document. It will evolve as we learn and grow._

**Maintained by the JobCraft AI Design & Engineering Team**  
_Last updated: December 2024_
