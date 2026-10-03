import { useState } from 'react';
import { money } from '../utils.js';

export default function BudgetSummary({ budget, setBudget, spent }) {
  const [draft, setDraft] = useState(budget || '');
  const [error, setError] = useState('');
  const left = budget - spent;
  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const over = budget > 0 && spent > budget;

  const save = (e) => {
    e.preventDefault();
    const n = Number(draft);
    if (!Number.isFinite(n) || n <= 0) return setError('Enter a budget greater than 0');
    setError(''); setBudget(n);
  };

  return (
    <section className="panel">
      <form className="inline" onSubmit={save}>
        <label>Monthly budget
          <input type="number" min="0" step="0.01" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="e.g. 30000" />
        </label>
        <button className="btn">Save budget</button>
      </form>
      {error && <p className="err" role="alert">{error}</p>}
      <div className="stats">
        <div><span>Budget</span><b>{money(budget)}</b></div>
        <div><span>Spent</span><b>{money(spent)}</b></div>
        <div><span>{over ? 'Over by' : 'Left'}</span><b className={over ? 'bad' : 'good'}>{money(Math.abs(left))}</b></div>
      </div>
      <div className="bar" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin="0" aria-valuemax="100" aria-label="Budget used">
        <div className={over ? 'fill bad-bg' : 'fill'} style={{ width: `${pct}%` }} />
      </div>
      {over && <p className="err">You have gone over budget. Review your recent expenses below.</p>}
    </section>
  );
}
