import { useMemo, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage.js';
import BudgetSummary from './components/BudgetSummary.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import CategoryBreakdown from './components/CategoryBreakdown.jsx';

export default function App() {
  const [budget, setBudget] = useLocalStorage('pb_budget', 0);
  const [expenses, setExpenses] = useLocalStorage('pb_expenses', []);
  const [filter, setFilter] = useState('All');

  const spent = useMemo(() => expenses.reduce((n, e) => n + e.amount, 0), [expenses]);
  const addExpense = (e) => setExpenses((list) => [{ ...e, id: crypto.randomUUID() }, ...list]);
  const removeExpense = (id) => setExpenses((list) => list.filter((e) => e.id !== id));

  return (
    <div className="app">
      <header><h1>Pocketbook</h1><p>Set a budget, log what you spend, see where it goes.</p></header>
      <BudgetSummary budget={budget} setBudget={setBudget} spent={spent} />
      <div className="cols">
        <ExpenseForm onAdd={addExpense} />
        <CategoryBreakdown expenses={expenses} />
      </div>
      <ExpenseList expenses={expenses} filter={filter} setFilter={setFilter} onDelete={removeExpense} />
    </div>
  );
}
