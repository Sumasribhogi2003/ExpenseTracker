import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ExpenseContext } from '../contexts/ExpenseContext';
import ExpenseItem from '../components/ExpenseItem';
import { PieChart } from 'react-native-chart-kit';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);
const screenWidth = Dimensions.get('window').width;

// Category icons
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

  // Calculate total spending
  const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Animated total spending
  const animatedTotal = useSharedValue(0);
  useEffect(() => {
    animatedTotal.value = withTiming(totalSpending, { duration: 1000 });
  }, [totalSpending]);

  const animatedProps = useAnimatedProps(() => ({
    text: `$${animatedTotal.value.toFixed(2)}`,
  }));

  // Spending per category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = Object.entries(categoryTotals).map(([cat, amt], index) => ({
    name: cat,
    amount: amt,
    color: `hsl(${index * 40}, 70%, 60%)`,
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  // Recent transactions
  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Total Spending</Text>
      <AnimatedText
        style={styles.total}
        animatedProps={animatedProps}
      />

      <Text style={styles.subtitle}>Spending by Category</Text>
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
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="12"
        absolute
      />

      {Object.entries(categoryTotals).map(([cat, amt]) => (
        <View key={cat} style={styles.categoryRow}>
          <Text style={styles.categoryText}>
            {categoryIcons[cat] || '📦'} {cat}
          </Text>
          <Text style={styles.amountText}>${amt.toFixed(2)}</Text>
        </View>
      ))}

      <Text style={styles.subtitle}>Recent Transactions</Text>
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
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A5276',
    marginBottom: 6,
  },
  total: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2874A6',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495E',
    marginTop: 24,
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27AE60',
  },
});

export default DashboardScreen;
