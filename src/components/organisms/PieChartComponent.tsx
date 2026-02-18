'use client';

import React, { useEffect, useState } from 'react';
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

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const outerRadius = isSmall ? 60 : 120;
  const legendLayout = isSmall ? 'horizontal' : 'vertical';
  const legendAlign = isSmall ? 'center' : 'right';
  const legendVAlign = isSmall ? 'bottom' : 'middle';
  const iconSize = isSmall ? 8 : 12;
  const containerHeight = isSmall ? 260 : 400;
  const legendWrapperStyle: React.CSSProperties = isSmall
    ? { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, paddingTop: 8 }
    : { paddingTop: 0 };
  const legendItemStyle: React.CSSProperties = isSmall
    ? { whiteSpace: 'normal', width: 120, overflow: 'visible', textAlign: 'left' }
    : {};

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-md">
      <Text variant="h3" as="h2" className="mb-4">
        {title}
      </Text>
      <ResponsiveContainer width="100%" height={containerHeight}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy={isSmall ? '42%' : '50%'}
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}`} />
          <Legend
            layout={legendLayout as any}
            verticalAlign={legendVAlign as any}
            align={legendAlign as any}
            iconSize={iconSize}
            wrapperStyle={legendWrapperStyle}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
