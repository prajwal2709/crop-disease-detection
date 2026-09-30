# Development Guide

This guide is for developers who want to understand, modify, or contribute to the Crop Disease Detection app.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [State Management](#state-management)
4. [Styling Guidelines](#styling-guidelines)
5. [Adding New Features](#adding-new-features)
6. [Testing](#testing)
7. [Code Quality](#code-quality)
8. [Common Tasks](#common-tasks)

---

## Architecture Overview

### Tech Stack Rationale

- **React**: Component-based UI, great mobile support
- **Vite**: Fast builds, hot module replacement
- **React Router**: Client-side routing for SPA
- **Tailwind CSS**: Utility-first, mobile-first styling
- **Axios**: Promise-based HTTP client

### Application Flow

```
User lands on Home page
    ↓
Clicks "Scan Crop"
    ↓
Navigates to Detect page
    ↓
Uploads/Captures image
    ↓
Clicks "Detect Disease"
    ↓
API call to backend
    ↓
Navigates to Result page
    ↓
Displays result with treatment
    ↓
Option to scan another or go home
```

---

## Component Structure

### Layout Components (`src/components/layout/`)

#### Header.jsx
```jsx
// Props: None
// Purpose: Navigation header with back button and history link
// Features:
// - Conditional back button (hidden on home)
// - History icon (shown only on home)
// - Responsive design
```

#### Footer.jsx
```jsx
// Props: None
// Purpose: Simple footer with attribution
```

#### MainLayout.jsx
```jsx
// Props: { children }
// Purpose: Wrapper for all pages
// Structure: Header + Main Content + Footer
```

### UI Components (`src/components/ui/`)

#### Button.jsx
```jsx
// Props: {
//   children,      // Button content
//   onClick,       // Click handler
//   variant,       // 'primary' | 'secondary' | 'danger'
//   disabled,      // Boolean
//   fullWidth,     // Boolean
//   className      // Additional classes
// }
```

#### Card.jsx
```jsx
// Props: {
//   children,      // Card content
//   className      // Additional classes
// }
```

#### Loader.jsx
```jsx
// Props: {
//   message        // Loading message to display
// }
```

#### ErrorMessage.jsx
```jsx
// Props: {
//   message,       // Error message
//   onRetry        // Retry callback (optional)
// }
```

#### ProgressBar.jsx
```jsx
// Props: {
//   percentage,    // 0-100
//   label,         // Progress label
//   showPercentage // Boolean
// }
```

### Crop Components (`src/components/crop/`)

#### ImageUploader.jsx
```jsx
// Props: {
//   onImageSelect, // Callback with File object
//   selectedImage  // Current image File
// }
// Features:
// - Gallery upload
// - Camera capture (mobile)
// - Image preview
// - File validation
// - Clear image option
```

#### DiseaseResult.jsx
```jsx
// Props: {
//   result: {
//     disease,      // Disease name
//     description,  // Disease info
//     treatment,    // Treatment advice
//     confidence    // 0-1
//   }
// }
// Features:
// - Visual status indicator
// - Voice output toggle
// - Confidence progress bar
// - Conditional treatment display
```

---

## State Management

### Local Component State (useState)

Used for UI state that doesn't need to be shared:

```javascript
// Example: Image upload state
const [selectedImage, setSelectedImage] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
```

### URL State (React Router)

Used for passing data between routes:

```javascript
// Passing data
navigate('/result', { state: { result } });

// Receiving data
const location = useLocation();
const result = location.state?.result;
```

### LocalStorage (services/storage.js)

Used for persistent data:

```javascript
// Save detection
addToHistory(result);

// Get history
const history = getHistory();

// Clear all
clearHistory();
```

---

## Styling Guidelines

### Tailwind CSS Best Practices

1. **Use utility classes first:**
   ```jsx
   <div className="flex items-center gap-4 p-6">
   ```

2. **Extract common patterns to components:**
   ```jsx
   // Good: Reusable Button component
   <Button variant="primary">Click me</Button>
   
   // Avoid: Repeated utility classes
   <button className="bg-primary text-white py-4 px-8 rounded-xl">
   ```

3. **Use custom CSS for complex animations:**
   ```css
   @layer components {
     .animate-special {
       animation: special 2s ease-in-out;
     }
   }
   ```

### Responsive Design

Always use mobile-first approach:

```jsx
<div className="text-base md:text-lg lg:text-xl">
  {/* Scales up on larger screens */}
</div>
```

### Color System

Defined in `tailwind.config.js`:

```javascript
colors: {
  primary: '#2E7D32',     // Main green
  disease: '#C62828',     // Disease red
  healthy: '#1B5E20',     // Healthy green
  secondary: '#E8F5E9'    // Background
}
```

Usage:
```jsx
<div className="bg-primary text-white">
<div className="text-disease">
<div className="bg-secondary">
```

---

## Adding New Features

### Adding a New Page

1. **Create page component:**
   ```jsx
   // src/pages/NewPage.jsx
   import React from 'react';
   
   const NewPage = () => {
     return (
       <div className="max-w-4xl mx-auto">
         <h1 className="text-3xl font-bold">New Page</h1>
       </div>
     );
   };
   
   export default NewPage;
   ```

2. **Add route:**
   ```jsx
   // src/App.jsx
   import NewPage from './pages/NewPage';
   
   <Routes>
     <Route path="/new" element={<NewPage />} />
   </Routes>
   ```

3. **Add navigation:**
   ```jsx
   <Button onClick={() => navigate('/new')}>
     Go to New Page
   </Button>
   ```

### Adding a New Service

1. **Create service file:**
   ```javascript
   // src/services/newService.js
   
   export const doSomething = async (data) => {
     try {
       // Implementation
       return result;
     } catch (error) {
       throw new Error('Failed to do something');
     }
   };
   ```

2. **Use in components:**
   ```jsx
   import { doSomething } from '../services/newService';
   
   const handleAction = async () => {
     const result = await doSomething(data);
   };
   ```

### Adding Multi-Language Support

1. **Create translation files:**
   ```javascript
   // src/locales/en.js
   export default {
     home: {
       title: 'Crop Disease Detection',
       scanButton: 'Scan Crop Now'
     }
   };
   
   // src/locales/hi.js
   export default {
     home: {
       title: 'फसल रोग पहचान',
       scanButton: 'अभी स्कैन करें'
     }
   };
   ```

2. **Create translation hook:**
   ```javascript
   // src/hooks/useTranslation.js
   import { useState } from 'react';
   import en from '../locales/en';
   import hi from '../locales/hi';
   
   export const useTranslation = () => {
     const [lang, setLang] = useState('en');
     const translations = { en, hi };
     
     return {
       t: translations[lang],
       setLanguage: setLang,
       currentLang: lang
     };
   };
   ```

3. **Use in components:**
   ```jsx
   const { t, setLanguage } = useTranslation();
   
   <h1>{t.home.title}</h1>
   <Button onClick={() => setLanguage('hi')}>हिंदी</Button>
   ```

---

## Testing

### Manual Testing Checklist

- [ ] Home page loads correctly
- [ ] Navigation works (all routes)
- [ ] Image upload from gallery works
- [ ] Camera capture works on mobile
- [ ] Image preview displays correctly
- [ ] Clear image button works
- [ ] Detect button is disabled without image
- [ ] Loading state shows during API call
- [ ] Error messages display correctly
- [ ] Result page shows all information
- [ ] Progress bar displays confidence
- [ ] Voice output works (where supported)
- [ ] Scan another button navigates correctly
- [ ] History page shows past detections
- [ ] History statistics are accurate
- [ ] Delete history item works
- [ ] Clear all history works
- [ ] Responsive design on mobile
- [ ] Responsive design on tablet
- [ ] Responsive design on desktop

### Unit Testing Setup (Optional)

1. **Install testing libraries:**
   ```bash
   npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
   ```

2. **Create test file:**
   ```javascript
   // src/components/ui/Button.test.jsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import Button from './Button';
   
   test('renders button with text', () => {
     render(<Button>Click me</Button>);
     expect(screen.getByText('Click me')).toBeInTheDocument();
   });
   
   test('calls onClick when clicked', () => {
     const handleClick = vi.fn();
     render(<Button onClick={handleClick}>Click me</Button>);
     fireEvent.click(screen.getByText('Click me'));
     expect(handleClick).toHaveBeenCalledTimes(1);
   });
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

---

## Code Quality

### ESLint Setup

1. **Install:**
   ```bash
   npm install --save-dev eslint eslint-plugin-react
   ```

2. **Configure:**
   ```javascript
   // .eslintrc.js
   module.exports = {
     extends: ['eslint:recommended', 'plugin:react/recommended'],
     rules: {
       'react/prop-types': 'off',
       'no-unused-vars': 'warn'
     }
   };
   ```

### Prettier Setup

1. **Install:**
   ```bash
   npm install --save-dev prettier
   ```

2. **Configure:**
   ```json
   // .prettierrc
   {
     "singleQuote": true,
     "semi": true,
     "tabWidth": 2,
     "trailingComma": "es5"
   }
   ```

### Git Hooks (Husky)

```bash
npm install --save-dev husky lint-staged

npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## Common Tasks

### Changing API Endpoint

1. **Development:**
   ```env
   # .env
   VITE_API_BASE_URL=http://localhost:5000
   ```

2. **Production:**
   Add to deployment platform environment variables

### Adding a New Disease Type

1. **Update backend to return new disease**

2. **Update frontend display logic:**
   ```jsx
   // DiseaseResult.jsx
   const getDiseaseIcon = (disease) => {
     const icons = {
       'Healthy': '✓',
       'Leaf Blight': '⚠️',
       'Rust': '🔴',
       'New Disease': '🆕'  // Add new icon
     };
     return icons[disease] || '❓';
   };
   ```

### Customizing Colors

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#YOUR_COLOR',
        dark: '#DARKER_SHADE',
        light: '#LIGHTER_SHADE',
      },
    },
  },
}
```

### Adding Animations

```css
/* src/index.css */
@layer utilities {
  .animate-custom {
    animation: custom 1s ease-in-out;
  }
}

@keyframes custom {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

### Optimizing Images

1. **Use WebP format**
2. **Compress images** (use tools like TinyPNG)
3. **Lazy load:**
   ```jsx
   <img src="image.jpg" loading="lazy" />
   ```

### Adding Analytics

```javascript
// src/utils/analytics.js
export const trackEvent = (category, action, label) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
};

// Usage
trackEvent('Disease Detection', 'Scan Complete', disease);
```

---

## Debugging Tips

### React DevTools
Install React DevTools browser extension for component inspection.

### Network Tab
Monitor API calls in browser DevTools Network tab.

### Console Logging
Use strategic console.log statements:
```javascript
console.log('State updated:', state);
console.table(arrayData);
console.group('Component Lifecycle');
```

### Error Boundaries
Add error boundary for graceful error handling:
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

---

## Performance Optimization

### Code Splitting
```javascript
import { lazy, Suspense } from 'react';

const History = lazy(() => import('./pages/History'));

<Suspense fallback={<Loader />}>
  <History />
</Suspense>
```

### Memoization
```javascript
import { useMemo, useCallback } from 'react';

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Image Optimization
- Use appropriate formats (WebP)
- Compress images
- Use responsive images with `srcset`

---

## Contributing Guidelines

1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/new-feature`
3. **Commit changes:** `git commit -m 'Add new feature'`
4. **Push to branch:** `git push origin feature/new-feature`
5. **Open Pull Request**

### Commit Message Format
```
type(scope): subject

body

footer
```

Example:
```
feat(detect): add confidence threshold filter

Added option to only show results above 70% confidence
to reduce false positives.

Closes #123
```

---

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

For questions or clarifications, please open an issue or contact the maintainers.
