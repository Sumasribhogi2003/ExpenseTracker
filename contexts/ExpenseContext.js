import React, { createContext, useState, useEffect } from 'react';
import { saveExpenses, loadExpenses, clearExpenses } from '../services/expenseStorage';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const loadedExpenses = await loadExpenses();
      console.log('Fetched expenses from storage:', loadedExpenses);
      setExpenses(loadedExpenses || []);
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    console.log('Expenses updated, saving to storage:', expenses);
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (expense) => {
    const id = expense.id ? Number(expense.id) : Date.now();
    const newExpense = { ...expense, id };
    console.log('Adding new expense:', newExpense);
    setExpenses((prev) => [...prev, newExpense]);
  };

  const editExpense = (id, updatedExpense) => {
    const idNum = Number(id);
    console.log(`Editing expense with id ${idNum}`, updatedExpense);
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === idNum ? updatedExpense : exp))
    );
  };

  const deleteExpense = (id) => {
    const idNum = Number(id);
    console.log(`Deleting expense with id ${idNum}`);
    setExpenses((prev) => prev.filter((exp) => exp.id !== idNum));
  };

  const resetExpenses = async () => {
    console.log('Resetting all expenses');
    await clearExpenses();
    setExpenses([]);
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, editExpense, deleteExpense, resetExpenses }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
