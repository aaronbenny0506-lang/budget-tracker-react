export const CATEGORIES = ['Food', 'Transport', 'Housing', 'Bills', 'Health', 'Fun', 'Shopping', 'Other'];
export const money = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(n);
export const today = () => new Date().toISOString().slice(0, 10);
