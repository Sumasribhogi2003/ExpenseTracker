import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ExpenseContext } from '../contexts/ExpenseContext';
import CategorySelector from '../components/CategorySelector';
import { validateExpense } from '../utils/validation';
import { useTheme } from '../contexts/ThemeContext'; // import your ThemeContext hook

const AddEditExpenseScreen = ({ navigation, route }) => {
  const { addExpense, editExpense, deleteExpense } = useContext(ExpenseContext);
  const editingExpense = route.params?.expense || null;

  const [amount, setAmount] = useState(editingExpense ? editingExpense.amount.toString() : '');
  const [date, setDate] = useState(editingExpense ? editingExpense.date : '');
  const [category, setCategory] = useState(editingExpense ? editingExpense.category : '');
  const [note, setNote] = useState(editingExpense ? editingExpense.note : '');
  const [errors, setErrors] = useState({});

  const { theme, toggleTheme, isDarkMode } = useTheme();  // use global theme state

  const onSubmit = () => {
    const expenseData = {
      amount: parseFloat(amount),
      date,
      category,
      note,
    };

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

  const onDelete = () => {
    if (editingExpense) {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this expense?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            onPress: () => {
              deleteExpense(editingExpense.id);
              navigation.goBack();
            },
          },
        ]
      );
    }
  };

  // Use theme for styling
  const themeStyles = {
    container: {
      padding: 16,
      backgroundColor: theme.background,
      flexGrow: 1,
    },
    label: {
      fontSize: 16,
      marginTop: 12,
      color: theme.text,
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      borderRadius: 6,
      padding: 8,
      marginTop: 4,
      color: theme.text,
      backgroundColor: isDarkMode ? '#222' : '#fff',
    },
    errorInput: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 13,
    },
    buttonContainer: {
      marginTop: 20,
    },
    toggleButton: {
      alignSelf: 'flex-end',
      padding: 8,
      marginBottom: 12,
    },
    toggleButtonText: {
      fontSize: 24,
      color: theme.text,
    },
  };

  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
      <TouchableOpacity style={themeStyles.toggleButton} onPress={toggleTheme}>
        <Text style={themeStyles.toggleButtonText}>
          {isDarkMode ? '🌞' : '🌙'}
        </Text>
      </TouchableOpacity>

      <Text style={themeStyles.label}>Amount *</Text>
      <TextInput
        style={[themeStyles.input, errors.amount && themeStyles.errorInput]}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        placeholderTextColor={isDarkMode ? '#888' : '#999'}
      />
      {errors.amount && <Text style={themeStyles.errorText}>{errors.amount}</Text>}

      <Text style={themeStyles.label}>Date *</Text>
      <TextInput
        style={[themeStyles.input, errors.date && themeStyles.errorInput]}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={isDarkMode ? '#888' : '#999'}
      />
      {errors.date && <Text style={themeStyles.errorText}>{errors.date}</Text>}

      <Text style={themeStyles.label}>Category *</Text>
      <CategorySelector
        selectedCategory={category}
        onSelectCategory={setCategory}
        isDarkMode={isDarkMode} // keep passing this if needed inside CategorySelector
      />
      {errors.category && <Text style={themeStyles.errorText}>{errors.category}</Text>}

      <Text style={themeStyles.label}>Note (optional)</Text>
      <TextInput
        style={themeStyles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Additional notes"
        placeholderTextColor={isDarkMode ? '#888' : '#999'}
      />

      <View style={themeStyles.buttonContainer}>
        <Button
          title={editingExpense ? 'Save Changes' : 'Add Expense'}
          onPress={onSubmit}
          color={isDarkMode ? '#5DADE2' : undefined}
        />
      </View>

      
    </ScrollView>
  );
};

export default AddEditExpenseScreen;
