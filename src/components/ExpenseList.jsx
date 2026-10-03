import { CATEGORIES, money } from '../utils.js';

export default function ExpenseList({ expenses, filter, setFilter, onDelete }) {
  const shown = filter === 'All' ? expenses : expenses.filter((e) => e.category === filter);
  const sorted = [...shown].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="panel">
      <div className="row">
        <h2>Expenses</h2>
        <select aria-label="Filter by category" value={filter} onChange={(e) => setFilter(e.target.value)}>
          {['All', ...CATEGORIES].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      {sorted.length === 0 ? <p className="muted">Nothing here yet.</p> : (
        <ul className="list">
          {sorted.map((e) => (
            <li key={e.id}>
              <div><b>{e.title}</b><div className="muted">{e.category} on {e.date}</div></div>
              <div className="row"><b>{money(e.amount)}</b>
                <button className="btn ghost" onClick={() => onDelete(e.id)} aria-label={`Delete ${e.title}`}>Delete</button></div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
