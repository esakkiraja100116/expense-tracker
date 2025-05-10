import React from 'react';
import { Home, CreditCard, PlusCircle, Settings, X } from 'lucide-react';

type Page = 'dashboard' | 'expenses' | 'add' | 'budget';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isMobileOpen: boolean;
  closeMobileSidebar: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  page: Page;
  currentPage: Page;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, currentPage, onClick }) => {
  const isActive = page === currentPage;
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium">{label}</span>
      {isActive && (
        <div className="ml-auto w-1.5 h-5 bg-blue-500 rounded-full"></div>
      )}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setCurrentPage,
  isMobileOpen,
  closeMobileSidebar,
}) => {
  const selectPage = (page: Page) => {
    setCurrentPage(page);
    closeMobileSidebar();
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden"
          onClick={closeMobileSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Expense Tracker</h2>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={closeMobileSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem
            icon={<Home size={20} />}
            label="Dashboard"
            page="dashboard"
            currentPage={currentPage}
            onClick={() => selectPage('dashboard')}
          />
          <NavItem
            icon={<CreditCard size={20} />}
            label="Expenses"
            page="expenses"
            currentPage={currentPage}
            onClick={() => selectPage('expenses')}
          />
          <NavItem
            icon={<PlusCircle size={20} />}
            label="Add Expense"
            page="add"
            currentPage={currentPage}
            onClick={() => selectPage('add')}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Budget Settings"
            page="budget"
            currentPage={currentPage}
            onClick={() => selectPage('budget')}
          />
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-1">Pro Tip</h3>
            <p className="text-sm text-blue-600">Set monthly budgets to track your spending habits more effectively.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;