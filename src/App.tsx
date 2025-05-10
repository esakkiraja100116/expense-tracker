import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { BudgetProvider } from './context/BudgetContext';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <ExpenseProvider>
      <BudgetProvider>
        <AppLayout />
      </BudgetProvider>
    </ExpenseProvider>
  );
}

export default App;