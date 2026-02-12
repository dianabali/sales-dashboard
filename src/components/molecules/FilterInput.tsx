'use client';

import React, { useState } from 'react';
import { Input, Button } from '@/components/atoms';

interface FilterInputProps {
  onApplyFilter: (threshold: number) => void;
  defaultValue?: number;
  isLoading?: boolean;
}

export const FilterInput: React.FC<FilterInputProps> = ({
  onApplyFilter,
  defaultValue = 0,
  isLoading = false,
}) => {
  const [threshold, setThreshold] = useState<number>(defaultValue);
  const [error, setError] = useState<string>('');

  const handleApplyFilter = () => {
    if (threshold < 0) {
      setError('Threshold must be a positive number');
      return;
    }
    setError('');
    onApplyFilter(threshold);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setThreshold(value === '' ? 0 : parseFloat(value));
    if (error) setError('');
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <Input
        type="number"
        label="Sales Threshold"
        placeholder="Enter minimum sales amount"
        value={threshold}
        onChange={handleInputChange}
        error={error}
        disabled={isLoading}
        min="0"
        step="0.01"
        helperText="Filter sales data by minimum amount"
      />
      <Button
        onClick={handleApplyFilter}
        disabled={isLoading}
        className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      >
        {isLoading ? 'Applying...' : 'Apply Filter'}
      </Button>
    </div>
  );
};
