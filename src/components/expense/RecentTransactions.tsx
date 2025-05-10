import React from 'react';
import { useExpenseContext } from '../../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';

interface RecentTransactionsProps {
  limit?: number;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ limit = 5 }) => {
  const { expenses } = useExpenseContext();
  
  // Sort expenses by date (newest first) and limit to specified number
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
  
  return (
    <div className="space-y-1">
      {recentExpenses.length > 0 ? (
        recentExpenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))
      ) : (
        <div className="text-center p-4 text-gray-500">
          No recent transactions. Add your first expense.
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;