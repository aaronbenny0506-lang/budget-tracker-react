import { useState } from 'react';
import { CATEGORIES, today } from '../utils.js';

const blank = { title: '', amount: '', category: CATEGORIES[0], date: today() };

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = 'Add a short description';
    if (!(Number(form.amount) > 0)) errs.amount = 'Enter an amount greater than 0';
    if (!form.date) errs.date = 'Pick a date';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onAdd({ ...form, title: form.title.trim(), amount: Number(form.amount) });
    setForm(blank);
  };

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <h2>Add expense</h2>
      <label>Description
        <input value={form.title} onChange={set('title')} maxLength={60} placeholder="Groceries" />
        {errors.title && <small className="err">{errors.title}</small>}
      </label>
      <label>Amount
        <input type="number" min="0" step="0.01" value={form.amount} onChange={set('amount')} placeholder="0.00" />
        {errors.amount && <small className="err">{errors.amount}</small>}
      </label>
      <label>Category
        <select value={form.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
      </label>
      <label>Date
        <input type="date" value={form.date} onChange={set('date')} />
        {errors.date && <small className="err">{errors.date}</small>}
      </label>
      <button className="btn">Add expense</button>
    </form>
  );
}
