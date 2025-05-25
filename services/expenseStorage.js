import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = 'expenses_data';

export const saveExpenses = async (expenses) => {
  try {
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    console.log('Expenses saved to AsyncStorage:', expenses);
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
};

export const loadExpenses = async () => {
  try {
    const data = await AsyncStorage.getItem(EXPENSES_KEY);
    const parsed = data ? JSON.parse(data) : [];
    console.log('Expenses loaded from AsyncStorage:', parsed);
    return parsed;
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
};

export const clearExpenses = async () => {
  try {
    await AsyncStorage.removeItem(EXPENSES_KEY);
    console.log('All expenses cleared from AsyncStorage.');
  } catch (error) {
    console.error('Error clearing expenses:', error);
  }
};
