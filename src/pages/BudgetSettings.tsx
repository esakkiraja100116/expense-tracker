import React, { useState } from 'react';
import { useBudgetContext } from '../context/BudgetContext';
import { useExpenseContext } from '../context/ExpenseContext';
import { Plus, Trash2, Save } from 'lucide-react';

const BudgetSettings: React.FC = () => {
  const { 
    monthlyBudget, 
    setMonthlyBudget, 
    categoryBudgets, 
    setCategoryBudget,
    removeCategoryBudget 
  } = useBudgetContext();
  
  const { expenses } = useExpenseContext();
  
  const [newBudget, setNewBudget] = useState(monthlyBudget.toString());
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAmount, setNewCategoryAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const categorySpending = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  
  // Get unique categories that don't have a budget yet
  const expenseCategories = Array.from(new Set(expenses.map(expense => expense.category)));
  const categoriesWithoutBudget = expenseCategories.filter(
    category => !categoryBudgets.some(budget => budget.category === category)
  );
  
  const handleMonthlyBudgetSave = () => {
    const budgetValue = parseFloat(newBudget);
    if (!isNaN(budgetValue) && budgetValue > 0) {
      setMonthlyBudget(budgetValue);
      showSuccessMessage();
    }
  };
  
  const handleAddCategoryBudget = () => {
    if (newCategoryName && newCategoryAmount) {
      const amount = parseFloat(newCategoryAmount);
      if (!isNaN(amount) && amount > 0) {
        setCategoryBudget(newCategoryName, amount);
        setNewCategoryName('');
        setNewCategoryAmount('');
        showSuccessMessage();
      }
    }
  };
  
  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Budget Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your monthly budget and category allocations</p>
      </div>
      
      {showSuccess && (
        <div className="mb-6 bg-green-50 text-green-700 p-3 rounded-lg border border-green-200 flex items-center">
          <div className="mr-2 bg-green-100 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          Budget updated successfully!
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Budget Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Budget</h3>
          
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-700 mb-1">
                Set your total monthly budget
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="monthlyBudget"
                  min="0"
                  step="10"
                  className="pl-8 pr-4 py-2 block w-full rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-transparent focus:outline-none focus:ring-2"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleMonthlyBudgetSave}
              className="flex items-center gap-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
          
          <div className="mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-800 font-medium">Current monthly budget</p>
                  <p className="text-2xl font-bold text-blue-900">${monthlyBudget.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-800 font-medium">Total spent this month</p>
                  <p className="text-2xl font-bold text-blue-900">
                    ${Object.values(categorySpending).reduce((sum, amount) => sum + amount, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Budgets Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Category Budgets</h3>
          
          <div className="flex items-end gap-3 mb-6">
            <div className="flex-1">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="categoryName"
                className="block w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 focus:ring-blue-500 focus:border-transparent focus:outline-none focus:ring-2"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              >
                <option value="">Select a category</option>
                {categoryBudgets.map(budget => (
                  <option key={`existing-${budget.category}`} value={budget.category}>
                    {budget.category} (Edit)
                  </option>
                ))}
                {categoriesWithoutBudget.map(category => (
                  <option key={`new-${category}`} value={category}>
                    {category} (New)
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label htmlFor="categoryAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Budget Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="categoryAmount"
                  min="0"
                  step="10"
                  className="pl-8 pr-4 py-2 block w-full rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-transparent focus:outline-none focus:ring-2"
                  value={newCategoryAmount}
                  onChange={(e) => setNewCategoryAmount(e.target.value)}
                  placeholder={newCategoryName ? categoryBudgets.find(b => b.category === newCategoryName)?.amount.toString() : ''}
                />
              </div>
            </div>
            
            <button
              onClick={handleAddCategoryBudget}
              className="flex items-center gap-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              disabled={!newCategoryName || !newCategoryAmount}
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
          
          {/* Category Budget List */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {categoryBudgets.length > 0 ? (
              categoryBudgets.map((budget) => {
                const spent = categorySpending[budget.category] || 0;
                const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
                const isOverBudget = percentage > 100;
                
                return (
                  <div key={budget.category} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{budget.category}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeCategoryBudget(budget.category)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-xs mt-1 text-right">
                      <span className={isOverBudget ? 'text-red-500' : 'text-gray-500'}>
                        {isOverBudget ? 'Over budget' : `${Math.round(percentage)}% spent`}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center p-4 text-gray-500">
                No category budgets set. Add your first category budget.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSettings;