import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CategoryBudget {
  category: string;
  amount: number;
}

interface BudgetContextType {
  monthlyBudget: number;
  setMonthlyBudget: (amount: number) => void;
  categoryBudgets: CategoryBudget[];
  setCategoryBudget: (category: string, amount: number) => void;
  removeCategoryBudget: (category: string) => void;
  getBudgetForCategory: (category: string) => number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudgetContext = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudgetContext must be used within a BudgetProvider');
  }
  return context;
};

// Sample category budgets
const sampleCategoryBudgets: CategoryBudget[] = [
  { category: 'Groceries', amount: 400 },
  { category: 'Entertainment', amount: 150 },
  { category: 'Transportation', amount: 200 },
  { category: 'Utilities', amount: 300 },
  { category: 'Dining', amount: 250 },
];

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(() => {
    const savedBudget = localStorage.getItem('monthlyBudget');
    return savedBudget ? parseFloat(savedBudget) : 2000;
  });

  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>(() => {
    const savedCategoryBudgets = localStorage.getItem('categoryBudgets');
    return savedCategoryBudgets ? JSON.parse(savedCategoryBudgets) : sampleCategoryBudgets;
  });

  useEffect(() => {
    localStorage.setItem('monthlyBudget', monthlyBudget.toString());
  }, [monthlyBudget]);

  useEffect(() => {
    localStorage.setItem('categoryBudgets', JSON.stringify(categoryBudgets));
  }, [categoryBudgets]);

  const setCategoryBudget = (category: string, amount: number) => {
    const existingIndex = categoryBudgets.findIndex(
      budget => budget.category === category
    );

    if (existingIndex >= 0) {
      const updatedBudgets = [...categoryBudgets];
      updatedBudgets[existingIndex] = { category, amount };
      setCategoryBudgets(updatedBudgets);
    } else {
      setCategoryBudgets([...categoryBudgets, { category, amount }]);
    }
  };

  const removeCategoryBudget = (category: string) => {
    setCategoryBudgets(
      categoryBudgets.filter(budget => budget.category !== category)
    );
  };

  const getBudgetForCategory = (category: string) => {
    const budget = categoryBudgets.find(
      budget => budget.category === category
    );
    return budget ? budget.amount : 0;
  };

  return (
    <BudgetContext.Provider
      value={{
        monthlyBudget,
        setMonthlyBudget,
        categoryBudgets,
        setCategoryBudget,
        removeCategoryBudget,
        getBudgetForCategory,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};