import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { ExpenseContext } from '../contexts/ExpenseContext'; // adjust path if needed

export default function SettingsScreen() {
  const { resetExpenses } = useContext(ExpenseContext);

  const confirmReset = () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all expenses? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetExpenses();
            Alert.alert('Expenses have been reset!');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Reset All Expenses" color="red" onPress={confirmReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20 },
});
