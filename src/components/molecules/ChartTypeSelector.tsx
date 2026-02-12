'use client';

import React from 'react';
import { Button } from '@/components/atoms';

export type ChartType = 'bar' | 'line' | 'pie';

interface ChartTypeSelectorProps {
  selectedType: ChartType;
  onTypeChange: (type: ChartType) => void;
  isLoading?: boolean;
}

export const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  isLoading = false,
}) => {
  const chartTypes: ChartType[] = ['bar', 'line', 'pie'];

  return (
    <div className="flex gap-2">
      {chartTypes.map((type) => (
        <Button
          key={type}
          variant={selectedType === type ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onTypeChange(type)}
          disabled={isLoading}
          className="capitalize"
        >
          {type}
        </Button>
      ))}
    </div>
  );
};
