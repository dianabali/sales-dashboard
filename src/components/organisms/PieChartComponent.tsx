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
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 561);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

  const outerRadius = isSmall ? 80 : 120;
  const containerHeight = isSmall ? 320 : 400;
  const legendLayout = isSmall ? 'horizontal' : 'vertical';
  const legendAlign = isSmall ? 'center' : 'right';
  const legendVAlign = isSmall ? 'bottom' : 'middle';
  const legendWrapperStyle: React.CSSProperties = isSmall
    ? { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, paddingTop: 8 }
    : { paddingTop: 0 };

  const renderLabel = ({ name, value }: { name: string; value: number }) => {
    if (isSmall) {
      // On small screens, hide labels from pie - they'll show in the legend below
      return null;
    }
    return `${name}: ${value}`;
  };

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
            cy={isSmall ? '45%' : '50%'}
            labelLine={false}
            label={renderLabel}
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
            wrapperStyle={legendWrapperStyle}
          />
        </PieChart>
      </ResponsiveContainer>
      {isSmall && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {chartData.map((item, index) => (
            <div key={item.name} className="text-sm p-2 bg-gray-50 rounded flex items-start gap-2 overflow-hidden">
              <span
                className="inline-block w-2 h-2 rounded-sm flex-shrink-0 mt-1"
                style={{ background: COLORS[index % COLORS.length] }}
              />
              <span className="text-gray-700 break-words overflow-hidden">
                <strong>{item.name}:</strong> {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
