// services/expenseStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = 'expenses';

export const saveExpenses = async (expenses) => {
  try {
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.log('Error saving expenses', error);
  }
};

export const loadExpenses = async () => {
  try {
    const savedExpenses = await AsyncStorage.getItem(EXPENSES_KEY);
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  } catch (error) {
    console.log('Error loading expenses', error);
    return [];
  }
};

export const clearExpenses = async () => {
  try {
    await AsyncStorage.removeItem(EXPENSES_KEY);
    console.log('Expenses cleared from storage');
  } catch (error) {
    console.log('Error clearing expenses', error);
  }
};
