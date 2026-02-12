'use client';

import React from 'react';
import { SalesData } from '@/lib/types';
import { BarChartComponent } from './BarChartComponent';
import { LineChartComponent } from './LineChartComponent';
import { PieChartComponent } from './PieChartComponent';
import type { ChartType } from '@/components/molecules';

interface ChartWrapperProps {
  data: SalesData[];
  chartType: ChartType;
  title?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  data,
  chartType,
  title,
}) => {
  switch (chartType) {
    case 'bar':
      return <BarChartComponent data={data} title={title || 'Sales Data - Bar Chart'} />;
    case 'line':
      return <LineChartComponent data={data} title={title || 'Sales Data - Line Chart'} />;
    case 'pie':
      return <PieChartComponent data={data} title={title || 'Sales Distribution - Pie Chart'} />;
    default:
      return <BarChartComponent data={data} title={title || 'Sales Data - Bar Chart'} />;
  }
};
