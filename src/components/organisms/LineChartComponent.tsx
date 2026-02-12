'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SalesData } from '@/lib/types';
import { Text } from '@/components/atoms';

interface LineChartComponentProps {
  data: SalesData[];
  title?: string;
}

export const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  title = 'Sales Data - Line Chart',
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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
