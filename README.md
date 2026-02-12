# Sales Dashboard

A modern, interactive sales analytics dashboard built with **Next.js**, **React**, and **Tailwind CSS**. Visualize your sales data with multiple chart types and powerful filtering capabilities.

## 🎯 Features

- **Multiple Chart Types** - View data as Bar, Line, or Pie charts
- **Custom Filtering** - Set custom sales thresholds to filter data
- **Real-time Analytics** - View total sales, revenue, and averages
- **Fully Responsive** - Works seamlessly on all devices
- **Fast Performance** - Built with Next.js for optimal speed

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ installed on your system
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation & Setup

1. **Clone or download the project**
   ```bash
   cd my-sales-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   - Go to [http://localhost:3000](http://localhost:3000)
   - Click **"Go to Dashboard"** to view the sales dashboard

## 📖 How to Use

### Home Page
- **URL**: http://localhost:3000
- View project overview and key features
- Click button to navigate to the dashboard

### Dashboard Page
- **URL**: http://localhost:3000/dashboard
- **Filter Data**: 
  1. Enter a minimum sales amount in the "Sales Threshold" input
  2. Click "Apply Filter"
  3. Data updates instantly
  
- **Change Chart Type**:
  1. Click **Bar**, **Line**, or **Pie** buttons
  2. Chart switches immediately
  
- **View Analytics**:
  - Total Sales count
  - Total Revenue (in dollars)
  - Average Sales per period

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages and routes
│   ├── page.tsx           # Home page
│   ├── dashboard/page.tsx # Dashboard page
│   └── layout.tsx         # Root layout
├── components/            # UI Components
│   ├── atoms/            # Basic components (Button, Input, Text)
│   ├── molecules/        # Composite components (Filter, Selector)
│   ├── organisms/        # Complex components (Charts)
│   └── templates/        # Page templates (Dashboard)
└── lib/                  # Utilities
    ├── api/             # API service layer
    └── types/           # TypeScript types
```

## 🎨 Customization

### Change Colors
Edit the Tailwind CSS color classes in component files. For example, in `src/components/organisms/BarChartComponent.tsx`, modify the `fill` properties.

### Modify Mock Data
Edit `src/lib/api/salesApi.ts` and update the `MOCK_SALES_DATA` array with your data:
```typescript
const MOCK_SALES_DATA: SalesData[] = [
  { id: '1', month: 'January', sales: 4000, revenue: 24000 },
  // Add more entries...
];
```

### Use Real API
1. Update `NEXT_PUBLIC_API_URL` in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api.com
   ```

2. Change `fetchSalesData(false)` to `fetchSalesData(true)` in `src/app/dashboard/page.tsx`

3. Ensure your API returns this format:
   ```json
   {
     "data": [
       { "id": "1", "month": "January", "sales": 4000, "revenue": 24000 }
     ],
     "success": true
   }
   ```

## 📦 Technologies Used

- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Quicksand Font** - Custom typography

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

### You can find this project deployed in Vercel using this link: https://sales-dashboard-blue-one.vercel.app/
