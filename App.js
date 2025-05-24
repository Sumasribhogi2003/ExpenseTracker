import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ExpenseProvider } from './contexts/ExpenseContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ExpenseProvider>
  );
}
