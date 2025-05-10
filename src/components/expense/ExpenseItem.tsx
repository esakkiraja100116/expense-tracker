import React from 'react';
import { type Expense } from '../../context/ExpenseContext';

interface ExpenseItemProps {
  expense: Expense;
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Groceries':
      return 'bg-blue-100 text-blue-800';
    case 'Entertainment':
      return 'bg-purple-100 text-purple-800';
    case 'Transportation':
      return 'bg-yellow-100 text-yellow-800';
    case 'Utilities':
      return 'bg-green-100 text-green-800';
    case 'Dining':
      return 'bg-red-100 text-red-800';
    case 'Healthcare':
      return 'bg-indigo-100 text-indigo-800';
    case 'Shopping':
      return 'bg-pink-100 text-pink-800';
    case 'Housing':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  const { amount, category, description, date } = expense;
  const formattedDate = new Date(date).toLocaleDateString();
  
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-100">
      <div className="flex items-center">
        <div className="mr-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(category)}`}>
            <span className="text-sm font-bold">${amount.toFixed(0)}</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-800">{description}</h4>
          <div className="flex items-center mt-1">
            <CategoryBadge category={category} />
            <span className="text-xs text-gray-500 ml-2">{formattedDate}</span>
          </div>
        </div>
      </div>
      <div className="font-medium">${amount.toFixed(2)}</div>
    </div>
  );
};

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(category)}`}>
      {category}
    </span>
  );
};

ExpenseItem.CategoryBadge = CategoryBadge;

export default ExpenseItem;