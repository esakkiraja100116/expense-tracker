import React from 'react';

interface BudgetProgressCardProps {
  category: string;
  spent: number;
  budget: number;
}

const BudgetProgressCard: React.FC<BudgetProgressCardProps> = ({
  category,
  spent,
  budget,
}) => {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
  const isOverBudget = percentage > 100;
  
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{category}</span>
        <div className="text-xs font-medium text-gray-500">
          ${spent.toFixed(2)} / ${budget.toFixed(2)}
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <div className="mt-1 text-xs text-right">
        <span className={isOverBudget ? 'text-red-500' : 'text-gray-500'}>
          {isOverBudget ? 'Over budget' : `${Math.round(percentage)}% used`}
        </span>
      </div>
    </div>
  );
};

export default BudgetProgressCard;