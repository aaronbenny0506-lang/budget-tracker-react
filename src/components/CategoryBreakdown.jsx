import { CATEGORIES, money } from '../utils.js';

export default function CategoryBreakdown({ expenses }) {
  const totals = CATEGORIES.map((c) => ({ c, v: expenses.filter((e) => e.category === c).reduce((n, e) => n + e.amount, 0) }))
    .filter((t) => t.v > 0).sort((a, b) => b.v - a.v);
  const max = totals[0]?.v || 1;

  return (
    <section className="panel">
      <h2>Spending by category</h2>
      {totals.length === 0 ? <p className="muted">No expenses yet. Add one to see your breakdown.</p> : totals.map((t) => (
        <div className="cat" key={t.c}>
          <div className="row"><span>{t.c}</span><b>{money(t.v)}</b></div>
          <div className="bar small"><div className="fill" style={{ width: `${(t.v / max) * 100}%` }} /></div>
        </div>
      ))}
    </section>
  );
}
