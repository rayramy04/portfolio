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

This is a **utility-class driven portfolio website** built with vanilla HTML, CSS, and JavaScript. The architecture follows a modular utility pattern with static data loading.

### Key Architectural Patterns

**Utility-Class Design**: Core functionality is provided by utility classes (`HTMLGenerator`, `DataPopulator`, `DOMHelpers`, `ErrorHandler`) that handle common patterns.

**PageManager System**: Page-specific logic is managed through the `PageManager` class extending `PageBase`, providing a fluent API for content population and animation.

**Static Data Loading**: Content is stored in JavaScript files in the `data/` directory and loaded via `window` objects.

### Core Application Flow

1. **Page Initialization** (`js/utils/page-manager.js`): PageManager coordinates page setup and content loading
2. **Unified Page Control** (`js/pages-unified.js`): Central configuration for all page-specific logic
3. **Utility Classes** (`js/utils/*`): Modular utilities for HTML generation, DOM manipulation, data population, and error handling
4. **Static Data** (`data/*.js`): JavaScript files exposing data through global `window` objects

### Data Structure

All content is organized in JavaScript files exposing global objects:
- `data/common.js` - Shared data (`window.commonData`)
- `data/home.js` - Homepage hero data (`window.homeData`)
- `data/about.js` - Personal info, story, timeline, interests (`window.aboutData`)
- `data/cv.js` - Education, experience, skills, awards (`window.cvData`)
- `data/projects.js` - Project portfolio (`window.projectsData`)
- `data/links.js` - Contact and social links (`window.linksData`)

### File Organization

```
portfolio/
├── *.html           # Static HTML pages (index, about, cv, projects, links)
├── css/             # Single style.css file
├── js/              # Vanilla JavaScript modules
│   ├── pages-unified.js     # Central page configuration
│   └── utils/               # Utility classes
│       ├── page-manager.js  # PageManager class extending PageBase
│       ├── dom-helpers.js   # DOM utilities + PageBase class
│       ├── html-generator.js # HTML template utilities
│       ├── data-populator.js # Data → DOM population utilities
│       └── error-handler.js  # Error handling utilities
├── data/            # JavaScript data files
└── assets/          # Images and static assets
```

## Making Changes

### Adding New Content

1. **Update JavaScript data files** in `data/` directory - content changes don't require code changes
2. **Image assets** go in `assets/` directory
3. **CSS modifications** are made to the single `css/style.css` file

### Adding New Pages

1. Create HTML file with basic structure including required script tags
2. Add navigation entry to `data/common.js`
3. Add page configuration to `PAGE_CONFIGS` in `js/pages-unified.js`
4. Add page initialization call to the DOMContentLoaded handler

### Working with the Utility System

The utility classes provide:
- **HTMLGenerator**: Template rendering with `renderList`, `renderIf`, and specialized item templates
- **DataPopulator**: Standard data → DOM population patterns with `populate`, `populateList`, etc.
- **DOMHelpers**: Safe DOM operations with retry mechanisms and content setting
- **ErrorHandler**: Consistent error handling with `safeExecute` and parallel execution support

### PageManager Fluent API

Page-specific logic uses the PageManager fluent API:
```javascript
manager
  .addDOMPopulator(populatorFunction)
  .addDataPopulator(config)
  .addAnimation(selector, delay)
  .addCustomInitializer(initFunction)
```

## Important Implementation Details

### Data Loading Pattern

Data is loaded synchronously via script tags in HTML. Each page loads its required data files directly.

### Component System

Common components (header/footer) are handled by the `PageBase` class via `loadCommonComponents()` method.

### Error Handling

All data population and DOM operations use `ErrorHandler.safeExecute()` for consistent error handling with fallback UI.

### Page Detection

Current page is determined by `getCurrentPage()` method in `PageBase` class which parses the URL pathname.

## Key Files to Understand

- `js/pages-unified.js` - Central page configuration and logic
- `js/utils/page-manager.js` - PageManager class for fluent page setup
- `js/utils/dom-helpers.js:67-247` - PageBase class with common functionality
- `js/utils/html-generator.js` - HTML template utilities and specialized renderers
- `data/common.js` - Site-wide configuration and navigation