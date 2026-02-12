'use client';

import type { SalesData, ApiResponse } from '@/lib/types';

// Mock data - replace with real API calls
const MOCK_SALES_DATA: SalesData[] = [
  { id: '1', month: 'January', sales: 4000, revenue: 24000 },
  { id: '2', month: 'February', sales: 3000, revenue: 18000 },
  { id: '3', month: 'March', sales: 2000, revenue: 12000 },
  { id: '4', month: 'April', sales: 2780, revenue: 16680 },
  { id: '5', month: 'May', sales: 1890, revenue: 11340 },
  { id: '6', month: 'June', sales: 2390, revenue: 14340 },
  { id: '7', month: 'July', sales: 3490, revenue: 20940 },
  { id: '8', month: 'August', sales: 4200, revenue: 25200 },
];

// Fetch from real API - configure your API endpoint here
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Fetch sales data from API or mock data
 * @param useRealApi - Set to true to use real API, false for mock data
 */
export async function fetchSalesData(useRealApi = false): Promise<SalesData[]> {
  try {
    if (useRealApi) {
      const response = await fetch(`${API_BASE_URL}/sales`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data: ApiResponse<SalesData> = await response.json();
      return data.data || [];
    }

    // Return mock data
    return MOCK_SALES_DATA;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    // Fallback to mock data on error
    return MOCK_SALES_DATA;
  }
}

/**
 * Fetch filtered sales data based on threshold
 */
export async function fetchFilteredSalesData(
  threshold: number,
  useRealApi = false
): Promise<SalesData[]> {
  const data = await fetchSalesData(useRealApi);
  return data.filter((item) => item.sales >= threshold);
}

/**
 * Create a sales record via API
 */
export async function createSalesRecord(record: Omit<SalesData, 'id'>): Promise<SalesData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data: SalesData = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating sales record:', error);
    return null;
  }
}

/**
 * Update a sales record via API
 */
export async function updateSalesRecord(
  id: string,
  record: Partial<SalesData>
): Promise<SalesData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data: SalesData = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating sales record:', error);
    return null;
  }
}
