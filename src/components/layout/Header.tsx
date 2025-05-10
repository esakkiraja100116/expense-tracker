import React from 'react';
import { MenuIcon, Bell, Search, User } from 'lucide-react';
import { useExpenseContext } from '../../context/ExpenseContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { expenses } = useExpenseContext();
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            className="text-gray-500 hover:text-gray-700 md:hidden focus:outline-none"
            onClick={toggleSidebar}
          >
            <MenuIcon size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Expense Tracker</h1>
        </div>
        
        <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search expenses..."
            className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right mr-4">
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-lg font-semibold text-gray-800">${totalExpenses.toFixed(2)}</p>
          </div>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <Bell size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;