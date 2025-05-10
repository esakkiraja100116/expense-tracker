import React, { useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { useBudgetContext } from '../context/BudgetContext';
import { PieChart, ChevronDown, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import SpendingChart from '../components/charts/SpendingChart';
import BudgetProgressCard from '../components/budget/BudgetProgressCard';
import RecentTransactions from '../components/expense/RecentTransactions';

const Dashboard: React.FC = () => {
  const { expenses } = useExpenseContext();
  const { monthlyBudget, categoryBudgets } = useBudgetContext();
  
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  // Calculate totals
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = monthlyBudget;
  const remaining = totalBudget - totalSpent;
  const percentSpent = (totalSpent / totalBudget) * 100;
  
  // Get data for categories
  const categorySpending = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  
  // Get top spending categories
  const topCategories = Object.entries(categorySpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-8/12 space-y-4">
          {/* Header with dropdown */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Financial Overview</h2>
            <div className="relative">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                <span>{timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : 'This Year'}</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Budget Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Total Budget</p>
                <span className="p-1.5 bg-blue-50 text-blue-500 rounded-lg">
                  <DollarSign size={16} />
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800">${totalBudget.toFixed(2)}</p>
              <div className="mt-2 text-xs text-gray-500">Monthly allocation</div>
            </div>
            
            {/* Total Spent Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Total Spent</p>
                <span className="p-1.5 bg-red-50 text-red-500 rounded-lg">
                  <TrendingUp size={16} />
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800">${totalSpent.toFixed(2)}</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className={percentSpent > 90 ? 'text-red-500' : 'text-gray-500'}>
                  {percentSpent.toFixed(0)}% of budget
                </span>
              </div>
            </div>
            
            {/* Remaining Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Remaining</p>
                <span className="p-1.5 bg-green-50 text-green-500 rounded-lg">
                  <TrendingDown size={16} />
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800">${remaining.toFixed(2)}</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className={remaining < 0 ? 'text-red-500' : 'text-green-500'}>
                  {remaining < 0 ? 'Over budget' : 'Under budget'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Spending Chart */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">Spending Trends</h3>
              <div className="text-xs bg-gray-100 rounded-lg overflow-hidden flex">
                <button 
                  className={`px-3 py-1.5 ${timeRange === 'week' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  onClick={() => setTimeRange('week')}
                >
                  Week
                </button>
                <button 
                  className={`px-3 py-1.5 ${timeRange === 'month' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  onClick={() => setTimeRange('month')}
                >
                  Month
                </button>
                <button 
                  className={`px-3 py-1.5 ${timeRange === 'year' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  onClick={() => setTimeRange('year')}
                >
                  Year
                </button>
              </div>
            </div>
            <div className="h-64">
              <SpendingChart timeRange={timeRange} />
            </div>
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="w-full md:w-4/12 space-y-4">
          {/* Top Spending Categories */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">Top Categories</h3>
              <span className="p-1.5 bg-blue-50 text-blue-500 rounded-lg">
                <PieChart size={16} />
              </span>
            </div>
            <div className="space-y-3">
              {topCategories.map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        category === 'Groceries' ? 'bg-blue-500' :
                        category === 'Entertainment' ? 'bg-purple-500' :
                        category === 'Transportation' ? 'bg-yellow-500' :
                        category === 'Utilities' ? 'bg-green-500' :
                        category === 'Dining' ? 'bg-red-500' : 'bg-gray-500'
                      }`}
                    ></div>
                    <span className="text-sm text-gray-700">{category}</span>
                  </div>
                  <span className="text-sm font-medium">${amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Budget Progress */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">Budget Progress</h3>
              <span className="p-1.5 bg-green-50 text-green-500 rounded-lg">
                <Calendar size={16} />
              </span>
            </div>
            <div className="space-y-3">
              {categoryBudgets.slice(0, 3).map(budget => {
                const spent = categorySpending[budget.category] || 0;
                return (
                  <BudgetProgressCard
                    key={budget.category}
                    category={budget.category}
                    spent={spent}
                    budget={budget.amount}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">Recent Transactions</h3>
              <button className="text-xs text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <RecentTransactions limit={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;