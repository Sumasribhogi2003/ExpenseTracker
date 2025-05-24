// screens/AddEditExpenseScreen.js
import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { ExpenseContext } from '../contexts/ExpenseContext';
import CategorySelector from '../components/CategorySelector';
import { validateExpense } from '../utils/validation';

const AddEditExpenseScreen = ({ navigation, route }) => {
  const { addExpense, editExpense, expenses } = useContext(ExpenseContext);
  const editingExpense = route.params?.expense || null;

  const [amount, setAmount] = useState(editingExpense ? editingExpense.amount.toString() : '');
  const [date, setDate] = useState(editingExpense ? editingExpense.date : '');
  const [category, setCategory] = useState(editingExpense ? editingExpense.category : '');
  const [note, setNote] = useState(editingExpense ? editingExpense.note : '');
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const expenseData = { amount: parseFloat(amount), date, category, note };

    const validationErrors = validateExpense(expenseData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingExpense) {
      editExpense(editingExpense.id, { ...editingExpense, ...expenseData });
    } else {
      addExpense({ id: Date.now(), ...expenseData });
    }

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Amount *</Text>
      <TextInput
        style={[styles.input, errors.amount && styles.errorInput]}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />
      {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

      <Text style={styles.label}>Date *</Text>
      <TextInput
        style={[styles.input, errors.date && styles.errorInput]}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />
      {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

      <Text style={styles.label}>Category *</Text>
      <CategorySelector selectedCategory={category} onSelectCategory={setCategory} />
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Additional notes"
      />

      <View style={styles.buttonContainer}>
        <Button title={editingExpense ? 'Save Changes' : 'Add Expense'} onPress={onSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  errorInput: { borderColor: 'red' },
  errorText: { color: 'red' },
  buttonContainer: { marginTop: 20 },
});

export default AddEditExpenseScreen;
