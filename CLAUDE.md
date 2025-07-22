# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a static portfolio website with no build system or package.json. To develop locally:

```bash
# Start local development server
python -m http.server 8000
# or
npx http-server .

# View at http://localhost:8000
```

No lint, typecheck, or test commands are available - this is vanilla HTML/CSS/JS.

## Architecture Overview

This is a **JSON-driven portfolio website** built with vanilla HTML, CSS, and JavaScript. The architecture follows a component-based pattern with data separation.

### Key Architectural Patterns

**Data-Driven Design**: All content is stored in JSON files in the `data/` directory and loaded dynamically via the `DataLoader` class.

**Component-Based Structure**: HTML templates are defined in JavaScript (`ComponentTemplates` in `load-components.js`) and injected dynamically.

**Page-Specific Rendering**: Different page types (`home`, `about`, `cv`, `projects`, `links`) are handled by the `PageRenderers` object in `page-renderers.js`.

### Core Application Flow

1. **App Initialization** (`js/app.js`): Main application controller that coordinates loading
2. **Data Loading** (`js/data-loader.js`): High-performance JSON loader with caching and parallel loading
3. **Component Management** (`js/load-components.js`): Templates for reusable HTML components
4. **Page Rendering** (`js/page-renderers.js`): Page-specific content population logic

### Data Structure

All content is organized in JSON files:
- `data/common.json` - Shared data (profile, social links, navigation)
- `data/home/hero.json` - Homepage hero section
- `data/about/` - Personal info, story, timeline, interests
- `data/cv/` - Education, experience, skills, awards, certifications, grants
- `data/projects/projects.json` - Project portfolio
- `data/links/contact.json` - Contact and social links

### File Organization

```
portfolio/
├── *.html           # Static HTML pages (index, about, cv, projects, links)
├── css/             # Modular CSS with base/, components/, pages/
├── js/              # Vanilla JavaScript modules
│   ├── app.js       # Main application controller
│   ├── data-loader.js    # JSON loading with caching
│   ├── load-components.js # Component templates
│   └── page-renderers.js  # Page-specific rendering
├── data/            # JSON content files organized by domain
└── assets/          # Images and static assets
```

## Making Changes

### Adding New Content

1. **Update JSON files** in `data/` directory - content changes don't require code changes
2. **Image assets** go in `assets/` directory
3. **CSS modifications** use the modular structure in `css/components/` or `css/pages/`

### Adding New Pages

1. Create HTML file with basic structure
2. Add navigation entry to `data/common.json`
3. Add case in `App.renderCurrentPage()` in `js/app.js`
4. Create corresponding renderer in `js/page-renderers.js`
5. Add data loading logic if needed in `js/data-loader.js`

### Working with the Data System

The `DataLoader` class provides:
- **Intelligent caching** - prevents duplicate requests
- **Parallel loading** - uses `Promise.all` for performance
- **Error handling** - provides fallback empty structures
- **Domain-specific methods** - `loadAboutJSON()`, `loadCVJSON()`, etc.

### CSS Architecture

CSS follows a modular approach:
- `css/base/` - Reset, typography, variables
- `css/components/` - Reusable UI components
- `css/pages/` - Page-specific styles
- Uses CSS custom properties for theming

## Important Implementation Details

### Data Loading Pattern

The application uses a sophisticated data loading system with caching. Always use the existing `DataLoader` instance rather than direct `fetch()` calls.

### Component System

HTML templates are defined in `ComponentTemplates` object and injected via `ComponentManager.loadComponents()`. This enables consistent header/footer across all pages.

### Error Handling

The application includes comprehensive error handling in the data loading layer with fallback empty structures to prevent crashes.

### Page Detection

Current page is determined by `getCurrentPage()` method in `js/app.js` which parses the URL pathname.

## Key Files to Understand

- `js/app.js:18-47` - Application initialization sequence
- `js/data-loader.js:98-168` - Main data loading and structuring logic
- `js/page-renderers.js` - All page-specific content population
- `data/common.json` - Site-wide configuration and navigation