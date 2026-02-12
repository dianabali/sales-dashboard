'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SalesData } from '@/lib/types';
import { Text } from '@/components/atoms';

interface BarChartComponentProps {
  data: SalesData[];
  title?: string;
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  title = 'Sales Data - Bar Chart',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <Text variant="body">No data available</Text>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-md">
      <Text variant="h3" as="h2" className="mb-4">
        {title}
      </Text>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
