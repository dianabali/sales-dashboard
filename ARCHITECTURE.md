# Project Architecture & Design

## Overview

This Sales Dashboard demonstrates modern web development best practices using Next.js 15 and the Atomic Design methodology. The project is built with a focus on scalability, maintainability, and reusability.

## Atomic Design Methodology

The project follows the **Atomic Design** pattern, which breaks UI into five hierarchical levels:

### 1. **Atoms** - Basic Building Blocks
Smallest, most basic components that can't be reduced further without losing meaning.

**Location**: `src/components/atoms/`

Includes:
- `Button.tsx` - Versatile button with variants (primary, secondary, danger)
- `Input.tsx` - Form input with labels, error handling, and helper text
- `Text.tsx` - Typography component for consistent text styling

**Characteristics**:
- Single responsibility
- Highly reusable
- No business logic
- Accept props for customization

### 2. **Molecules** - Simple Components
Groups of atoms bonded together to form functional units.

**Location**: `src/components/molecules/`

Includes:
- `FilterInput.tsx` - Combines Input + Button for sales threshold filtering
- `ChartTypeSelector.tsx` - Group of buttons for chart type selection

**Characteristics**:
- Still simple but with more purpose
- Combines atoms logically
- May contain basic state
- Reusable across pages

### 3. **Organisms** - Complex Components
Groups of molecules joined together to form more complex, distinct sections.

**Location**: `src/components/organisms/`

Includes:
- `BarChartComponent.tsx` - Bar chart visualization
- `LineChartComponent.tsx` - Line chart visualization
- `PieChartComponent.tsx` - Pie chart visualization
- `ChartWrapper.tsx` - Smart component managing chart type switching

**Characteristics**:
- Complex, feature-rich components
- Combine molecules and atoms
- May handle data fetching
- Handle user interactions
- Can contain conditional rendering

### 4. **Templates** - Page Layouts
Page-level layouts that use organisms to create complete page structures.

**Location**: `src/components/templates/`

Includes:
- `DashboardTemplate.tsx` - Complete dashboard layout with all sections

**Characteristics**:
- Combine organisms into full pages
- Handle page-level state
- Manage data flow between components
- Define overall page structure

### 5. **Pages** - Route Handlers
Actual Next.js pages that use templates.

**Location**: `src/app/`

Includes:
- `page.tsx` - Home/landing page
- `dashboard/page.tsx` - Dashboard page

---

## Directory Structure

```
my-sales-dashboard/
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Dashboard page component
│   │   ├── api/                      # API routes (for future expansion)
│   │   ├── layout.tsx                # Root layout wrapper
│   │   ├── page.tsx                  # Home/landing page
│   │   ├── globals.css               # Global styles
│   │   └── favicon.ico
│   │
│   ├── components/                   # UI Components (Atomic Design)
│   │   ├── atoms/                    # Level 1: Basic blocks
│   │   │   ├── Button.tsx           # Styled button
│   │   │   ├── Input.tsx            # Form input field
│   │   │   ├── Text.tsx             # Typography component
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   ├── molecules/                # Level 2: Simple components
│   │   │   ├── FilterInput.tsx      # Filter UI component
│   │   │   ├── ChartTypeSelector.tsx # Chart type buttons
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   ├── organisms/                # Level 3: Complex sections
│   │   │   ├── BarChartComponent.tsx    # Bar chart
│   │   │   ├── LineChartComponent.tsx   # Line chart
│   │   │   ├── PieChartComponent.tsx    # Pie chart
│   │   │   ├── ChartWrapper.tsx     # Chart type switcher
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   └── templates/                # Level 4: Page templates
│   │       ├── DashboardTemplate.tsx # Full dashboard layout
│   │       └── index.ts             # Barrel export
│   │
│   └── lib/                          # Utility functions & types
│       ├── api/
│       │   └── salesApi.ts          # API service layer
│       └── types/
│           └── index.ts             # TypeScript interfaces
│
├── public/                           # Static assets
│   ├── next.svg
│   ├── vercel.svg
│   └── ...
│
├── .github/                          # GitHub specific files (optional)
│   └── workflows/                    # CI/CD workflows
│
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind CSS config
├── postcss.config.mjs                # PostCSS config
├── eslint.config.mjs                 # ESLint config
├── .gitignore                        # Git ignore rules
├── README.md                         # Project documentation
├── SETUP_INSTRUCTIONS.md             # Setup guide
├── GITHUB_SETUP.md                   # GitHub deployment guide
├── ARCHITECTURE.md                   # This file
└── package-lock.json                 # Dependency lock file
```

---

## Data Flow

### Component Hierarchy

```
RootLayout
└── Home (page.tsx)
    └── DashboardTemplate
        ├── FilterInput (molecule)
        │   ├── Input (atom)
        │   └── Button (atom)
        ├── ChartTypeSelector (molecule)
        │   ├── Button (atom) x3
        ├── ChartWrapper (organism)
        │   ├── BarChartComponent
        │   ├── LineChartComponent
        │   └── PieChartComponent
        └── Stats Display
            └── Text (atom) x3
```

### State Management Flow

```
DashboardTemplate (manages):
├── chartType: ChartType
├── filteredData: SalesData[]
├── isLoading: boolean
│
└── Handlers:
    ├── handleApplyFilter(threshold)
    │   ├── Filters data
    │   ├── Updates filteredData
    │   └── Calls onFilterApply callback
    └── handleChartTypeChange(type)
        └── Updates chartType
```

### API Data Flow

```
Dashboard Page
├── useEffect (on mount)
│   └── fetchSalesData(useRealApi)
│       ├── Try: fetch from API
│       │   └── Parse response
│       └── Catch: return mock data
│
└── Pass data to TemplateComponent
    └── Filter → ChartWrapper
        └── Display based on chartType
```

---

## Technology Stack

### Core Framework
- **Next.js 15.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS
- **PostCSS 4** - CSS transformation

### Data Visualization
- **Recharts 2.10** - React charting library
  - Bar charts
  - Line charts
  - Pie charts

### API & HTTP
- **Axios 1.6** - HTTP client for API calls
- **Next.js Built-in** - API routes support

### Development Tools
- **ESLint 9** - Code quality
- **TypeScript Compiler** - Type checking

---

## Key Design Decisions

### 1. **Atomic Design Pattern**
- **Why**: Promotes component reusability and consistency
- **Benefit**: Easy to scale and maintain
- **Trade-off**: More files initially, but better organization

### 2. **Mock Data with API Support**
- **Why**: Allows frontend development without backend
- **Benefit**: Quick development iteration
- **Implementation**: `useRealApi` flag in `fetchSalesData()`

### 3. **Server Components & Client Components**
- **Why**: Next.js 15 App Router best practice
- **Implementation**: `'use client'` for interactive components
- **Benefit**: Better performance and SEO

### 4. **Separation of Concerns**
- **Types**: All interfaces in `lib/types/`
- **API**: All API calls in `lib/api/`
- **Components**: UI logic in components
- **Pages**: Route handlers only

### 5. **Tailwind CSS for Styling**
- **Why**: Utility-first approach, fast development
- **Benefit**: Consistent design, small bundle
- **Alternative**: CSS Modules or styled-components

---

## Component Composition Examples

### Example 1: FilterInput (Molecule)
```
FilterInput
├── FormField: (grouped Input + Button)
│   ├── Input (atom)
│   │   ├── label
│   │   ├── input field
│   │   ├── error message
│   │   └── helper text
│   └── Button (atom)
│       ├── loading state
│       └── click handler
```

### Example 2: ChartWrapper (Organism)
```
ChartWrapper
├── Conditional Rendering
│   ├── if chartType === 'bar'
│   │   └── BarChartComponent
│   ├── if chartType === 'line'
│   │   └── LineChartComponent
│   └── if chartType === 'pie'
│       └── PieChartComponent
```

### Example 3: DashboardTemplate (Template)
```
DashboardTemplate
├── Header (Text atom)
├── Controls Section
│   ├── FilterInput (molecule)
│   └── ChartTypeSelector (molecule)
├── Chart Section
│   └── ChartWrapper (organism)
└── Stats Section
    ├── Total Sales (Text atom)
    ├── Total Revenue (Text atom)
    └── Average Sales (Text atom)
```

---

## Scalability Considerations

### Adding New Features

**New Chart Type**:
1. Create component in `organisms/`
2. Add to `ChartWrapper.tsx` switch statement
3. Update `ChartType` type in molecules

**New Filter Option**:
1. Add to `FilterInput.tsx` molecule
2. Update `FilterOptions` type
3. Modify `DashboardTemplate.tsx` logic

**New Data Type**:
1. Add interface to `lib/types/index.ts`
2. Update API service
3. Create components as needed

### Performance Optimizations

1. **Code Splitting**: Next.js handles automatic code splitting
2. **Image Optimization**: Use `next/image` for images
3. **Caching**: 
   - Static rendering where possible
   - React Query for API caching (future)
4. **Memoization**: Use `React.memo()` for expensive components

---

## Development Best Practices

### Component Guidelines

1. **Single Responsibility**: Each component does one thing
2. **Prop Drilling**: Use context for deeply nested data
3. **Naming**: Clear, descriptive component names
4. **Types**: Always use TypeScript interfaces
5. **Documentation**: Add JSDoc comments

### File Organization

```tsx
// 1. Imports
import React from 'react';
import { Component } from '@/components/...';

// 2. Interfaces/Types
interface ComponentProps {
  prop1: string;
}

// 3. Component
export const MyComponent: React.FC<ComponentProps> = ({ prop1 }) => {
  return <div>{prop1}</div>;
};
```

### Git Workflow

```bash
# Feature branches
git checkout -b feature/new-feature
git commit -m "feat: description"
git push origin feature/new-feature

# Create pull request on GitHub
```

---

## Testing Strategy

### Recommended Testing Libraries

- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Cypress** - E2E testing

### Test Structure

```
src/
├── components/
│   ├── atoms/Button.tsx
│   ├── atoms/Button.test.tsx    # Unit tests
├── __tests__/
│   ├── integration/             # Integration tests
│   └── e2e/                     # E2E tests (Cypress)
```

---

## Deployment Architecture

### Local Development
```
npm run dev
↓
Next.js Dev Server (localhost:3000)
↓
File Changes → Hot Reload
```

### Production Build
```
npm run build
↓
Next.js Generate (.next folder)
↓
npm start
↓
Next.js Production Server
```

### Deployment Options

1. **Vercel** (Recommended)
   - Zero-config deployment
   - Automatic previews
   - Analytics included

2. **Docker**
   - Build image
   - Deploy to cloud

3. **Traditional Server**
   - Build locally
   - Upload `.next` folder
   - Run with Node.js

---

## Security Considerations

1. **Environment Variables**: Keep secrets in `.env.local`
2. **CORS**: Configure if API is different origin
3. **Input Validation**: Validate all user inputs
4. **Dependencies**: Keep packages updated
5. **XSS Prevention**: React handles escaping by default
6. **CSRF**: Ensure proper session management

---

## Monitoring & Logging

### Development
- Browser DevTools
- Next.js console output
- VS Code debugger

### Production
- Implement error tracking (Sentry)
- Analytics (Vercel Analytics)
- Performance monitoring
- Logging service

---
