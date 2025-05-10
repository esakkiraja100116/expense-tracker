import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import ExpenseList from '../../pages/ExpenseList';
import AddExpense from '../../pages/AddExpense';
import BudgetSettings from '../../pages/BudgetSettings';

type Page = 'dashboard' | 'expenses' | 'add' | 'budget';

const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <ExpenseList />;
      case 'add':
        return <AddExpense />;
      case 'budget':
        return <BudgetSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header toggleSidebar={toggleMobileSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMobileOpen={isMobileSidebarOpen}
          closeMobileSidebar={() => setIsMobileSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;