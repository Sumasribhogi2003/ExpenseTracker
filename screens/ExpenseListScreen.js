import React, { useContext, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ExpenseContext } from '../contexts/ExpenseContext';
import ExpenseItem from '../components/ExpenseItem';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const ExpenseListScreen = ({ navigation }) => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);
  const { theme, toggleTheme, isDarkMode } = useTheme();

  useEffect(() => {
    console.log('ExpenseListScreen mounted');
    return () => console.log('ExpenseListScreen unmounted');
  }, []);

  useEffect(() => {
    console.log('Expenses changed:', expenses);
  }, [expenses]);

  const confirmDelete = (id) => {
    console.log('Prompting delete confirmation for expense id:', id);
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteExpense(id);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <ExpenseItem expense={item} textColor={theme.text} />
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => {
            console.log('Navigating to edit expense:', item);
            navigation.navigate('AddEditExpense', { expense: item });
          }}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => confirmDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View />
        <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
          <Text style={[styles.toggleIcon, { color: theme.text }]}>
            {isDarkMode ? '🌞' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      {expenses.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.text }]}>No expenses recorded yet.</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddEditExpense')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 12,
  },
  toggleButton: {
    padding: 8,
  },
  toggleIcon: {
    fontSize: 28,
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    borderRadius: 12,
    padding: 6,
    marginVertical: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#3498DB',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2E86C1',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
  },
});

export default ExpenseListScreen;
