# Project Setup Instructions

## What Was Done in This Project

### 1. **Project Foundation**
- ✅ Created a Next.js 15 application with the App Router
- ✅ Configured TypeScript for type-safe development
- ✅ Set up Tailwind CSS for modern, responsive styling
- ✅ Configured ESLint for code quality

### 2. **Atomic Design Implementation**
The project follows the **Atomic Design** methodology with five levels:

- **Atoms** (`src/components/atoms/`)
  - `Button.tsx` - Reusable button component with variants
  - `Input.tsx` - Form input with error handling
  - `Text.tsx` - Typography component with multiple variants

- **Molecules** (`src/components/molecules/`)
  - `FilterInput.tsx` - Combines Input + Button for filtering
  - `ChartTypeSelector.tsx` - Group of buttons to select chart type

- **Organisms** (`src/components/organisms/`)
  - `BarChartComponent.tsx` - Bar chart visualization with Recharts
  - `LineChartComponent.tsx` - Line chart visualization
  - `PieChartComponent.tsx` - Pie chart visualization
  - `ChartWrapper.tsx` - Smart component that switches between chart types

- **Templates** (`src/components/templates/`)
  - `DashboardTemplate.tsx` - Full dashboard layout with all components

### 3. **Data Management**
- **Types** (`src/lib/types/index.ts`)
  - `SalesData` - Sales record interface
  - `ChartData` - Chart data structure
  - `FilterOptions` - Filter configuration
  - `ApiResponse` - API response wrapper

- **API Service** (`src/lib/api/salesApi.ts`)
  - Mock data for development
  - Functions for CRUD operations
  - Support for both mock and real API data
  - Error handling and fallback mechanisms

### 4. **Features Implemented**

#### ✅ Multiple Chart Types
- **Bar Chart** - Compare sales and revenue side-by-side
- **Line Chart** - Track trends over time
- **Pie Chart** - Show distribution of sales by month

#### ✅ Custom Filter Input
- Users can set a custom sales threshold
- Filters data in real-time
- Input validation and error messages
- Loading states during filtering

#### ✅ Dashboard Analytics
- Real-time statistics display:
  - Total Sales count
  - Total Revenue in dollars
  - Average Sales per period
- Responsive grid layout

#### ✅ API Integration Ready
- Mock data structure ready
- Easy switch to real API
- Error handling for failed requests
- Fallback to mock data on errors

### 5. **Pages Created**
- **Home** (`src/app/page.tsx`) - Landing page with features overview
- **Dashboard** (`src/app/dashboard/page.tsx`) - Main sales dashboard

### 6. **Styling**
- Modern, clean UI with Tailwind CSS
- Responsive design for all screen sizes
- Proper color scheme and typography
- Interactive hover effects and transitions

### 7. **Code Quality**
- Full TypeScript support
- ESLint configuration
- Proper component separation
- Clear naming conventions

---

## How to Use This Project

### Initial Setup

```bash
# 1. Navigate to project directory
cd my-sales-dashboard

# 2. Install dependencies
npm install
# This installs: next, react, react-dom, recharts, axios, and dev dependencies

# 3. Start development server
npm run dev

# 4. Open browser
# Visit http://localhost:3000
```

### Development Workflow

```bash
# Start dev server
npm run dev

# Run linter
npm run lint

# Build for production
npm build

# Start production server
npm start
```

### Project Structure Summary

```
src/
├── app/
│   ├── dashboard/page.tsx      # Dashboard page
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── atoms/                  # Basic UI blocks
│   ├── molecules/              # Composite components
│   ├── organisms/              # Complex sections
│   └── templates/              # Page layouts
└── lib/
    ├── api/                    # API services
    └── types/                  # TypeScript types
```

---

## Features Guide

### Using the Dashboard

1. **View Home Page**
   - Go to `/`
   - See project overview
   - Click "Go to Dashboard"

2. **Dashboard Features**
   - **Chart Type Switching**: Click Bar, Line, or Pie buttons
   - **Filter Data**: 
     - Enter a sales threshold (e.g., 2000)
     - Click "Apply Filter"
     - See filtered results in real-time
   - **View Analytics**: 
     - Total Sales
     - Total Revenue
     - Average Sales

### Modifying Data

**Using Mock Data**
- Data is in `src/lib/api/salesApi.ts`
- Add new entries to `MOCK_SALES_DATA` array
- Each entry needs: `id`, `month`, `sales`, `revenue`

**Using Real API**
1. Update `API_BASE_URL` in `salesApi.ts`
2. Change `fetchSalesData(false)` to `fetchSalesData(true)` in dashboard/page.tsx
3. Ensure your API returns data in the expected format

**Expected API Response Format**
```json
{
  "data": [
    {
      "id": "1",
      "month": "January",
      "sales": 4000,
      "revenue": 24000
    }
  ],
  "success": true
}
```

---

## Customization Guide

### 1. **Change Colors/Theme**
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#3b82f6',  // Change primary color
  secondary: '#10b981' // Change secondary color
}
```

### 2. **Modify Chart Colors**
Edit `src/components/organisms/PieChartComponent.tsx`:
```typescript
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', ...];
```

### 3. **Add New Atoms**
Create file: `src/components/atoms/YourComponent.tsx`
- Keep it simple and reusable
- Export from `atoms/index.ts`

### 4. **Add New Pages**
Create file: `src/app/your-page/page.tsx`
- Use existing components
- Follow the same structure

### 5. **Add API Endpoints**
Create file: `src/app/api/your-endpoint/route.ts`
```typescript
export async function GET() {
  // Your API logic
  return Response.json({ data: [...] });
}
```

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel dashboard
```

### Deploy to Other Platforms

**Netlify**
```bash
npm run build
# Deploy the .next folder
```

**Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Troubleshooting

### Issue: Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Issue: Node modules not installing due to Dropbox
- Try using a different package manager: `yarn` or `pnpm`
- Or move project outside Dropbox temporarily

### Issue: Recharts not working
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
```bash
# Run type check
npx tsc --noEmit
```

---

## Next Steps / Future Enhancements

Consider adding:

1. **Data Persistence**
   - Database integration (MongoDB, PostgreSQL)
   - Server-side state management

2. **Advanced Features**
   - User authentication
   - Data export (CSV, PDF)
   - Advanced filtering/search
   - Date range picker

3. **Performance**
   - React Query for data caching
   - Image optimization
   - Code splitting

4. **Testing**
   - Unit tests with Jest
   - Component tests with React Testing Library
   - E2E tests with Cypress

5. **DevOps**
   - GitHub Actions for CI/CD
   - Automated testing on pushes
   - Docker containerization

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Atomic Design](https://atomicdesign.bradfrost.com)
- [TypeScript](https://www.typescriptlang.org/docs)

---

## Support

For issues:
1. Check the README.md
2. Review component prop types
3. Check browser console for errors
4. Verify API endpoint is correct

Happy coding! 🚀
