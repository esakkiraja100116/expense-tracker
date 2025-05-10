import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Omit<Expense, 'id'>) => void;
  getExpenseById: (id: string) => Expense | undefined;
  filterExpenses: (category?: string, startDate?: string, endDate?: string) => Expense[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};

// Sample expense data
const sampleExpenses: Expense[] = [
  {
    id: '1',
    amount: 45.99,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    date: '2025-05-15',
  },
  {
    id: '2',
    amount: 9.99,
    category: 'Entertainment',
    description: 'Movie subscription',
    date: '2025-05-14',
  },
  {
    id: '3',
    amount: 32.50,
    category: 'Transportation',
    description: 'Fuel',
    date: '2025-05-12',
  },
  {
    id: '4',
    amount: 120.00,
    category: 'Utilities',
    description: 'Electricity bill',
    date: '2025-05-10',
  },
  {
    id: '5',
    amount: 75.25,
    category: 'Dining',
    description: 'Dinner with friends',
    date: '2025-05-08',
  },
];

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : sampleExpenses;
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const updateExpense = (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    setExpenses(
      expenses.map(expense => 
        expense.id === id ? { ...updatedExpense, id } : expense
      )
    );
  };

  const getExpenseById = (id: string) => {
    return expenses.find(expense => expense.id === id);
  };

  const filterExpenses = (category?: string, startDate?: string, endDate?: string) => {
    return expenses.filter(expense => {
      const matchesCategory = !category || expense.category === category;
      const matchesStartDate = !startDate || expense.date >= startDate;
      const matchesEndDate = !endDate || expense.date <= endDate;
      return matchesCategory && matchesStartDate && matchesEndDate;
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
        getExpenseById,
        filterExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};