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
- **Next.js** - React framework with App Router
- **React** - UI library
- **TypeScript** - Type safety

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - CSS transformation

### Data Visualization
- **Recharts** - React charting library
  - Bar charts
  - Line charts
  - Pie charts

### API & HTTP
- **Axios** - HTTP client for API calls
- **Next.js Built-in** - API routes support

### Development Tools
- **ESLint** - Code quality
- **TypeScript Compiler** - Type checking

---

### Performance Optimizations

1. **Code Splitting**: Next.js handles automatic code splitting
2. **Image Optimization**: Use `next/image` for images
3. **Caching**: 
   - Static rendering where possible
   - React Query for API caching (future)
4. **Memoization**: Use `React.memo()` for expensive components
