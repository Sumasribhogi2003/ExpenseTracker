// utils/dateHelpers.js

export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const getMonthYear = (date) => {
  const d = new Date(date);
  return `${d.getMonth() + 1}-${d.getFullYear()}`;
};
