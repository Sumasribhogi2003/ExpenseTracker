// components/ExpenseItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseItem = ({ expense }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.categoryIndicator, { backgroundColor: expense.color }]} />
      <View style={styles.details}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.date}>{expense.date}</Text>
      </View>
      {expense.note ? <Text style={styles.note}>{expense.note}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
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
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  note: {
    fontStyle: 'italic',
    color: '#555',
  },
});

export default ExpenseItem;
