// screens/ChartsScreen.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext'; // Import your theme hook

const screenWidth = Dimensions.get('window').width;

const ChartsScreen = () => {
  const { expenses } = useContext(ExpenseContext);
  const { theme, toggleTheme, isDarkMode } = useTheme(); // use theme context

  // Pie Chart: Spending by Category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    amount,
    color: getColorForCategory(category),
    legendFontColor: theme.text, // adapt to theme text color
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
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with toggle button */}
      <View style={styles.header}>
        <View /> {/* empty left spacer */}
        <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
          <Text style={[styles.toggleIcon, { color: theme.text }]}>
            {isDarkMode ? '🌞' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.pageTitle, { color: theme.text }]}>Spending Insights</Text>

      <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.text }]}>
        <Text style={[styles.chartTitle, { color: theme.text }]}>By Category</Text>
        {pieData.length > 0 ? (
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              ...chartConfig,
              backgroundGradientFrom: theme.card,
              backgroundGradientTo: theme.card,
              color: (opacity = 1) => theme.text + Math.floor(opacity * 255).toString(16), // fallback
              labelColor: (opacity = 1) => theme.text,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        ) : (
          <Text style={[styles.emptyText, { color: theme.text }]}>No expense data to display</Text>
        )}
      </View>

      <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.text }]}>
        <Text style={[styles.chartTitle, { color: theme.text }]}>Monthly Trends</Text>
        {lineData.length > 0 ? (
          <LineChart
            data={{
              labels: lineLabels,
              datasets: [{ data: lineData }],
            }}
            width={screenWidth - 32}
            height={256}
            chartConfig={{
              ...chartConfig,
              backgroundGradientFrom: theme.card,
              backgroundGradientTo: theme.card,
              color: (opacity = 1) => theme.text + Math.floor(opacity * 255).toString(16),
              labelColor: (opacity = 1) => theme.text,
            }}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text style={[styles.emptyText, { color: theme.text }]}>No trend data to display</Text>
        )}
      </View>
    </ScrollView>
  );
};

// Chart styling configuration
const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Tailwind blue-500 default fallback
  labelColor: (opacity = 1) => `rgba(75, 85, 99, ${opacity})`, // Gray-600 fallback
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
    paddingHorizontal: 16,
    paddingTop: 20,
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
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 8,
    marginTop: 6,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default ChartsScreen;
