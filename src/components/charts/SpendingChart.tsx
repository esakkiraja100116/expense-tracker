import React from 'react';
import { useExpenseContext } from '../../context/ExpenseContext';

interface SpendingChartProps {
  timeRange: 'week' | 'month' | 'year';
}

const SpendingChart: React.FC<SpendingChartProps> = ({ timeRange }) => {
  const { expenses } = useExpenseContext();
  
  // Generate data for chart based on time range
  const getChartData = () => {
    const currentDate = new Date();
    let labels: string[] = [];
    let data: number[] = [];
    
    if (timeRange === 'week') {
      // Last 7 days
      labels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(currentDate.getDate() - 6 + i);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      });
      
      data = labels.map((_, i) => {
        const date = new Date();
        date.setDate(currentDate.getDate() - 6 + i);
        const dayStart = new Date(date.setHours(0, 0, 0, 0));
        const dayEnd = new Date(date.setHours(23, 59, 59, 999));
        
        return expenses
          .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= dayStart && expenseDate <= dayEnd;
          })
          .reduce((sum, expense) => sum + expense.amount, 0);
      });
    } else if (timeRange === 'month') {
      // Last 30 days in weekly chunks
      labels = Array.from({ length: 4 }, (_, i) => {
        const date = new Date();
        date.setDate(currentDate.getDate() - 21 + (i * 7));
        return `Week ${i + 1}`;
      });
      
      data = labels.map((_, i) => {
        const endDate = new Date();
        endDate.setDate(currentDate.getDate() - 21 + ((i + 1) * 7));
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 21 + (i * 7));
        
        return expenses
          .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startDate && expenseDate <= endDate;
          })
          .reduce((sum, expense) => sum + expense.amount, 0);
      });
    } else {
      // Last 12 months
      labels = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - 11 + i);
        return date.toLocaleDateString('en-US', { month: 'short' });
      });
      
      data = labels.map((_, i) => {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - 11 + i);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        return expenses
          .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= monthStart && expenseDate <= monthEnd;
          })
          .reduce((sum, expense) => sum + expense.amount, 0);
      });
    }
    
    return { labels, data };
  };
  
  const { labels, data } = getChartData();
  const maxValue = Math.max(...data, 1); // Ensure maxValue is at least 1 to avoid division by zero
  
  // Function to generate bar height based on data value
  const getBarHeight = (value: number) => {
    // Calculate percentage (maximum height is 90% of the container)
    const percentage = (value / maxValue) * 90;
    // Return a pixel value instead of percentage to ensure visibility
    return `${Math.max(percentage, value > 0 ? 5 : 0)}px`; // Minimum 5px height for non-zero values
  };
  
  return (
    <div className="flex flex-col" style={{ height: '200px' }}>
      <div className="flex-1 flex items-end">
        <div className="w-full h-full flex items-end justify-between gap-1">
          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1 h-full">
              <div className="w-full flex justify-center h-[160px] items-end">
                <div 
                  className="w-full max-w-[30px] bg-blue-500 hover:bg-blue-600 rounded-t-md transition-all duration-300"
                  style={{ height: getBarHeight(value) }}
                  title={`$${value.toFixed(0)}`}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-600 font-medium">${value.toFixed(0)}</div>
              <div className="mt-1 text-xs text-gray-500">{labels[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;