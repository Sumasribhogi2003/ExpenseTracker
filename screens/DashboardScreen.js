import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ExpenseContext } from '../contexts/ExpenseContext';
import ExpenseItem from '../components/ExpenseItem';
import { PieChart } from 'react-native-chart-kit';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../contexts/ThemeContext';  // import your theme hook

const AnimatedText = Animated.createAnimatedComponent(Text);
const screenWidth = Dimensions.get('window').width;

const categoryIcons = {
  Food: '🍕',
  Transport: '🚗',
  Shopping: '🛍️',
  Health: '💊',
  Entertainment: '🎬',
  Utilities: '💡',
  Travel: '✈️',
  Other: '📦',
};

const DashboardScreen = () => {
  const { expenses } = useContext(ExpenseContext);
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const animatedTotal = useSharedValue(0);
  useEffect(() => {
    animatedTotal.value = withTiming(totalSpending, { duration: 1000 });
  }, [totalSpending]);

  const animatedProps = useAnimatedProps(() => ({
    text: `$${animatedTotal.value.toFixed(2)}`,
  }));

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([cat, amt], index) => ({
    name: cat,
    amount: amt,
    color: `hsl(${index * 40}, 70%, 60%)`,
    legendFontColor: theme.text,
    legendFontSize: 14,
  }));

  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Theme toggle icon on top right */}
      <View style={styles.header}>
        <View /> {/* Empty left space to center title if you want */}
        <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
          <Text style={[styles.toggleIcon, { color: theme.text }]}>
            {isDarkMode ? '🌞' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: theme.text }]}>Total Spending</Text>
      <AnimatedText
        style={[styles.total, { color: theme.text }]}
        animatedProps={animatedProps}
      />

      <Text style={[styles.subtitle, { color: theme.text }]}>Spending by Category</Text>
      <PieChart
        data={chartData.map(item => ({
          name: item.name,
          population: item.amount,
          color: item.color,
          legendFontColor: item.legendFontColor,
          legendFontSize: item.legendFontSize,
        }))}
        width={screenWidth - 32}
        height={180}
        chartConfig={{
          backgroundColor: theme.card,
          backgroundGradientFrom: theme.card,
          backgroundGradientTo: theme.card,
          color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="12"
        absolute
      />

      {Object.entries(categoryTotals).map(([cat, amt]) => (
        <View
          key={cat}
          style={[
            styles.categoryRow,
            { backgroundColor: theme.card, shadowColor: theme.text },
          ]}
        >
          <Text style={[styles.categoryText, { color: theme.text }]}>
            {categoryIcons[cat] || '📦'} {cat}
          </Text>
          <Text style={[styles.amountText, { color: '#27AE60' }]}>${amt.toFixed(2)}</Text>
        </View>
      ))}

      <Text style={[styles.subtitle, { color: theme.text }]}>Recent Transactions</Text>
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    padding: 8,
  },
  toggleIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  total: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;
