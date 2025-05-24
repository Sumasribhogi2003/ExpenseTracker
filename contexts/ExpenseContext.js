// contexts/ExpenseContext.js
import React, { createContext, useState, useEffect } from 'react';
import { saveExpenses, loadExpenses, clearExpenses } from '../services/expenseStorage';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const loadedExpenses = await loadExpenses();
      console.log('Loaded expenses:', loadedExpenses);
      setExpenses(loadedExpenses);
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const resetExpenses = async () => {
    console.log('resetExpenses called');
    await clearExpenses();
    setExpenses([]);
    console.log('Expenses reset in context');
  };

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, resetExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
