# Design Document

## Overview

情報学部学生向けのポートフォリオサイトは、モダンでおしゃれなデザインを採用し、若者らしさと専門性を両立させます。カラフルなアクセントカラーとグラデーション効果を活用し、視覚的に印象的でありながら読みやすさを重視したデザインとします。

## Architecture

### Site Structure
```
Portfolio Site
├── Home (index.html)
├── About (about.html)
├── CV (cv.html)
├── Portfolio (portfolio.html)
└── Links (links.html)
```

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Animations**: CSS animations + AOS.js (Animate On Scroll)
- **Fonts**: Google Fonts (Poppins for headings, Inter for body text)
- **Icons**: Font Awesome or Feather Icons
- **Hosting**: GitHub Pages

## Components and Interfaces

### 1. Navigation Component
- **Sticky header** with smooth scroll navigation
- **Mobile hamburger menu** for responsive design
- **Active page indicator** with color transitions
- **Logo/Name** on the left, navigation links on the right

### 2. Hero Section (Home Page)
- **Circular profile photo** with animated gradient border
- **Animated text reveal** for name and catchphrase
- **Floating particles** or subtle background animation
- **Scroll indicator** with bouncing arrow animation
- **Keywords section** with colorful tags/badges

### 3. Content Sections
- **Card-based layout** with subtle shadows and hover effects
- **Timeline component** with colorful progress indicators
- **Skills visualization** with progress bars or circular indicators
- **Project cards** with image overlays and hover animations

### 4. Footer Component
- **Social media icons** with hover color transitions
- **Contact information** and quick links
- **Back to top** button with smooth scroll

## Data Models

### Profile Data Structure
```javascript
const profileData = {
  personal: {
    name: "学生名",
    title: "情報学部学生",
    catchphrase: "キャッチフレーズ",
    bio: "自己紹介文",
    photo: "path/to/profile.jpg",
    keywords: ["キーワード1", "キーワード2", "キーワード3"]
  },
  education: {
    university: "大学名",
    department: "情報学部",
    gpa: "GPA",
    graduationYear: "卒業予定年"
  },
  experience: [
    {
      title: "職種",
      company: "会社名",
      period: "期間",
      description: "説明"
    }
  ],
  skills: {
    languages: ["言語1", "言語2"],
    frameworks: ["フレームワーク1", "フレームワーク2"],
    tools: ["ツール1", "ツール2"],
    databases: ["DB1", "DB2"]
  },
  projects: [
    {
      name: "プロジェクト名",
      description: "説明",
      technologies: ["技術1", "技術2"],
      githubUrl: "GitHub URL",
      demoUrl: "デモURL",
      image: "path/to/image.jpg"
    }
  ],
  social: {
    github: "GitHub URL",
    twitter: "Twitter URL",
    youtube: "YouTube URL",
    note: "note URL"
  }
}
```

## Design System

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)
- **Accent**: #06b6d4 (Cyan)
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Background**: #ffffff (White)
- **Surface**: #f8fafc (Gray-50)
- **Text Primary**: #1e293b (Slate-800)
- **Text Secondary**: #64748b (Slate-500)

### Gradients
- **Hero Background**: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- **Card Hover**: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
- **Button Primary**: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)

### Typography
- **Headings**: Poppins (600, 700)
- **Body**: Inter (400, 500, 600)
- **Code**: JetBrains Mono

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

## Page-Specific Design

### Home Page
- **Hero Section**: Full viewport height with gradient background
- **Profile Photo**: 200px circular with animated gradient border
- **Keywords**: Colorful badges with hover animations
- **Scroll Indicator**: Animated bouncing arrow

### About Page
- **Timeline**: Vertical timeline with colorful milestones
- **Interest Cards**: Grid layout with icon and description
- **Story Section**: Two-column layout with image and text

### CV Page
- **Skills Visualization**: Progress bars with gradient fills
- **Experience Cards**: Timeline-style layout
- **Download Button**: Prominent CTA for PDF download

### Portfolio Page
- **Project Grid**: Masonry or grid layout
- **Project Cards**: Image overlay with hover effects
- **Filter Buttons**: Category-based filtering with active states

### Links Page
- **Social Icons**: Large, colorful icons with hover animations
- **Contact Form**: Styled form elements with focus states
- **Service Links**: Card-based layout for different services

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Adaptations
- **Navigation**: Hamburger menu with slide-out drawer
- **Hero**: Stacked layout with smaller profile photo
- **Cards**: Single column layout
- **Typography**: Reduced font sizes for better readability

## Animations and Interactions

### Page Load Animations
- **Fade in from bottom** for main content sections
- **Stagger animations** for lists and grids
- **Profile photo** scale-in animation

### Hover Effects
- **Cards**: Subtle lift with shadow increase
- **Buttons**: Color transitions and scale effects
- **Links**: Underline animations
- **Images**: Zoom effects on hover

### Scroll Animations
- **Parallax effects** for background elements
- **Progress indicators** for skills and timeline
- **Reveal animations** using AOS.js

## Error Handling

### Image Loading
- **Placeholder images** for missing profile photos
- **Lazy loading** for portfolio images
- **Alt text** for all images

### External Links
- **Fallback handling** for broken social media links
- **Loading states** for external content
- **Error messages** for failed form submissions

## Testing Strategy

### Cross-Browser Testing
- **Chrome, Firefox, Safari, Edge** compatibility
- **Mobile browsers** testing on iOS and Android

### Performance Testing
- **Lighthouse audits** for performance, accessibility, SEO
- **Image optimization** testing
- **Load time** measurements

### Accessibility Testing
- **Keyboard navigation** testing
- **Screen reader** compatibility
- **Color contrast** validation
- **Focus indicators** verification

### Responsive Testing
- **Device testing** across different screen sizes
- **Orientation changes** (portrait/landscape)
- **Touch interactions** on mobile devices