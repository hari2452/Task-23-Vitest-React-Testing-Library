import type { Expense, FilterType } from '../types';

// ==========================================
// 1. FORMAT CURRENCY
// ==========================================
export function formatCurrency(amount: number): string {
  const formattedAmount = Math.abs(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${amount < 0 ? '-' : ''}₹${formattedAmount}`;
}

// ==========================================
// 2. FORMAT DATE
// ==========================================
export function formatDate(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return 'Invalid date';
  }

  const parsedDate = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Invalid date';
  }

  // Reject impossible dates such as 2026-02-30
  if (parsedDate.toISOString().slice(0, 10) !== date) {
    return 'Invalid date';
  }

  return parsedDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// ==========================================
// 3. GET TOTAL BY CATEGORY
// ==========================================
export function getTotalByCategory(
  expenses: Expense[],
  category: string
): number {
  return expenses
    .filter((expense) => expense.category === category)
    .reduce((total, expense) => total + expense.amount, 0);
}

// ==========================================
// 4. FILTER EXPENSES
// ==========================================
export function filterExpenses(
  expenses: Expense[],
  category: string,
  period: FilterType,
  now: Date = new Date()
): Expense[] {
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  // Calculate the last 7 days, including today
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);

  // Calculate the beginning of the current month
  const monthStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  return expenses.filter((expense) => {
    // Filter by category
    if (category !== 'All' && expense.category !== category) {
      return false;
    }

    // Return all expenses if no date filter is selected
    if (period === 'all') {
      return true;
    }

    const expenseDate = new Date(`${expense.date}T00:00:00`);

    // Reject invalid dates
    if (Number.isNaN(expenseDate.getTime())) {
      return false;
    }

    // Exclude future expenses
    if (expenseDate > today) {
      return false;
    }

    // Filter by week or month
    if (period === 'week') {
      return expenseDate >= weekStart;
    }

    if (period === 'month') {
      return expenseDate >= monthStart;
    }

    return true;
  });
}