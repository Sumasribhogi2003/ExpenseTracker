import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import AddEditExpenseScreen from '../screens/AddEditExpenseScreen';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import ChartsScreen from '../screens/ChartsScreen';
//import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigator for Add/Edit screens (if needed)
function ExpensesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExpenseList" component={ExpenseListScreen} options={{ title: 'Expenses' }} />
      <Stack.Screen name="AddEditExpense" component={AddEditExpenseScreen} options={{ title: 'Add / Edit Expense' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Expenses" component={ExpensesStack} />
      <Tab.Screen name="Charts" component={ChartsScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}
