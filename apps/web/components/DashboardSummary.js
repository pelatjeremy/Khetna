export function DashboardSummary({ summary }) {
  const items = [
    { label: 'Portfolio value', value: summary.portfolioValue },
    { label: 'Daily change', value: summary.dailyChange },
    { label: 'Open analyses', value: summary.openAnalyses },
    { label: 'Watchlist', value: summary.watchlistItems },
  ];

  return (
    <section className="summary-grid" aria-label="Dashboard summary">
      {items.map((item) => (
        <article className="metric-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}
