'use client';

import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { SalesData } from '@/lib/types';
import { Text } from '@/components/atoms';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

interface PieChartComponentProps {
  data: SalesData[];
  dataKey?: 'sales' | 'revenue';
  title?: string;
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  dataKey = 'sales',
  title = 'Sales Distribution - Pie Chart',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <Text variant="body">No data available</Text>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.month,
    value: item[dataKey],
  }));

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-md">
      <Text variant="h3" as="h2" className="mb-4">
        {title}
      </Text>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
