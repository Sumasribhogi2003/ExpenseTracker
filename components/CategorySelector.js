// components/CategorySelector.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  { id: 'food', label: 'Food', color: '#FF6347' },
  { id: 'transport', label: 'Transport', color: '#1E90FF' },
  { id: 'entertainment', label: 'Entertainment', color: '#FFD700' },
  { id: 'utilities', label: 'Utilities', color: '#32CD32' },
];

const CategorySelector = ({ selectedCategory, onSelectCategory, isDarkMode }) => {
  return (
    <View style={styles.container}>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat.id}
          style={[
            styles.categoryBtn,
            selectedCategory === cat.id && { borderColor: cat.color, borderWidth: 2 },
          ]}
          onPress={() => onSelectCategory(cat.id)}
        >
          <View style={[styles.colorBox, { backgroundColor: cat.color }]} />
          <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 6,
    borderRadius: 4,
  },
});

export default CategorySelector;
