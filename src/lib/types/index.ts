// Sales data types
export interface SalesData {
  id: string;
  month: string;
  sales: number;
  revenue: number;
  date?: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface FilterOptions {
  threshold: number;
  startDate?: string;
  endDate?: string;
}

export interface ApiResponse<T> {
  data: T[];
  success: boolean;
  message?: string;
}
