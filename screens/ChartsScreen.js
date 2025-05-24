// screens/ChartsScreen.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { PieChart, LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ChartsScreen = () => {
  const { expenses } = useContext(ExpenseContext);

  // Pie Chart: Spending by Category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    amount,
    color: getColorForCategory(category),
    legendFontColor: '#4B5563',
    legendFontSize: 14,
  }));

  // Line Chart: Monthly Spending Trend
  const monthlyTotals = {};
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const key = `${date.getMonth() + 1}-${date.getFullYear()}`;
    monthlyTotals[key] = (monthlyTotals[key] || 0) + expense.amount;
  });

  const sortedMonths = Object.keys(monthlyTotals).sort((a, b) => {
    const [mA, yA] = a.split('-').map(Number);
    const [mB, yB] = b.split('-').map(Number);
    return new Date(yA, mA - 1) - new Date(yB, mB - 1);
  });

  const lineLabels = sortedMonths;
  const lineData = sortedMonths.map((month) => monthlyTotals[month]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Spending Insights</Text>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>By Category</Text>
        {pieData.length > 0 ? (
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        ) : (
          <Text style={styles.emptyText}>No expense data to display</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Monthly Trends</Text>
        {lineData.length > 0 ? (
          <LineChart
            data={{
              labels: lineLabels,
              datasets: [{ data: lineData }],
            }}
            width={screenWidth - 32}
            height={256}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text style={styles.emptyText}>No trend data to display</Text>
        )}
      </View>
    </ScrollView>
  );
};

// Chart styling configuration
const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Tailwind blue-500
  labelColor: (opacity = 1) => `rgba(75, 85, 99, ${opacity})`, // Gray-600
  strokeWidth: 2,
  decimalPlaces: 2,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#3B82F6',
  },
};

// Helper: Assign category colors
function getColorForCategory(category) {
  const palette = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // violet
    '#06B6D4', // cyan
    '#F43F5E', // pink
    '#6366F1', // indigo
  ];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Light gray background
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937', // Gray-800
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151', // Gray-700
    marginBottom: 12,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 8,
    marginTop: 6,
  },
  emptyText: {
    fontSize: 15,
    color: '#9CA3AF', // Gray-400
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default ChartsScreen;
