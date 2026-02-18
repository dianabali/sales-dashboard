'use client';

import React, { useState, useEffect } from 'react';
import { SalesData } from '@/lib/types';
import { FilterInput, ChartTypeSelector, type ChartType } from '@/components/molecules';
import { ChartWrapper } from '@/components/organisms';
import { Text } from '@/components/atoms';

interface DashboardTemplateProps {
  initialData: SalesData[];
  onFilterApply?: (threshold: number, filteredData: SalesData[]) => void;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  initialData,
  onFilterApply,
}) => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [filteredData, setFilteredData] = useState<SalesData[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyFilter = (threshold: number) => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const filtered = initialData.filter((item) => item.sales >= threshold);
      setFilteredData(filtered);
      onFilterApply?.(threshold, filtered);
      setIsLoading(false);
    }, 300);
  };

  const handleClearFilter = () => {
    setIsLoading(false);
    setFilteredData(initialData);
    onFilterApply?.(0, initialData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Text variant="h1" as="h1" className="text-blue-600 mb-2">
            Sales Dashboard
          </Text>
          <Text variant="body" className="text-gray-600">
            Monitor your sales performance and analytics in real-time
          </Text>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Filter */}
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
            <Text variant="h3" as="h3" className="mb-4">
              Filter Data
            </Text>
            <FilterInput onApplyFilter={handleApplyFilter} onClear={handleClearFilter} isLoading={isLoading} />
          </div>

          {/* Chart Type Selector */}
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-600">
            <Text variant="h3" as="h3" className="mb-4">
              Chart Type
            </Text>
            <ChartTypeSelector
              selectedType={chartType}
              onTypeChange={setChartType}
              isLoading={isLoading}
            />
            <Text variant="caption" className="mt-4 block">
              {filteredData.length} of {initialData.length} records displayed
            </Text>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-500">
          <ChartWrapper data={filteredData} chartType={chartType} />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Text variant="caption" className="text-gray-500 block mb-2">
              Total Sales
            </Text>
            <Text variant="h2" as="h2" className="text-gray-500 block">
              {filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
            </Text>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Text variant="caption" className="text-gray-500 block mb-2">
              Total Revenue
            </Text>
            <Text variant="h2" as="h2" className="text-gray-500 block">
              ${filteredData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
            </Text>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Text variant="caption" className="text-gray-500 block mb-2">
              Average Sales
            </Text>
            <Text variant="h2" as="h2" className="text-gray-500 block">
              {(
                filteredData.reduce((sum, item) => sum + item.sales, 0) / (filteredData.length || 1)
              ).toFixed(0)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
