// utils/validation.js

export const validateExpense = ({ amount, date, category }) => {
  const errors = {};

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    errors.amount = 'Amount must be a positive number.';
  }

  if (!date) {
    errors.date = 'Date is required.';
  }

  if (!category) {
    errors.category = 'Category must be selected.';
  }

  return errors;
};
