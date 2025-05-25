import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ExpenseProvider } from './contexts/ExpenseContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <ExpenseProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </ExpenseProvider>
  );
}
