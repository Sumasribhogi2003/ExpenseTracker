import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const ExpenseItem = ({ expense }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={[styles.categoryIndicator, { backgroundColor: expense.color }]} />
      <View style={styles.details}>
        <Text style={[styles.amount, { color: theme.text }]}>${expense.amount.toFixed(2)}</Text>
        <Text style={[styles.category, { color: theme.text }]}>{expense.category}</Text>
        <Text style={[styles.date, { color: theme.text }]}>{expense.date}</Text>
        {expense.note ? <Text style={[styles.note, { color: theme.text }]}>{expense.note}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  categoryIndicator: {
    width: 10,
    height: 40,
    borderRadius: 5,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  category: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
  },
  note: {
    fontStyle: 'italic',
    fontSize: 13,
  },


});

const lightTheme = {
  background: '#fff',
  text: '#000',
  card: '#f5f5f5',
  cardShadow: '#ccc'
};

const darkTheme = {
  background: '#121212',
  text: '#fff',
  card: '#2C2F33',
  cardShadow: '#000'
};

export default ExpenseItem;
