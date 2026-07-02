export function MarketSnapshotCard({ market }) {
  return (
    <section className="dashboard-card" aria-labelledby="market-title">
      <p className="card-kicker">Market</p>
      <h2 id="market-title">{market.title}</h2>
      <p className="status-pill">{market.mood}</p>
      <p className="card-copy">{market.trend}</p>
      <p className="muted">{market.updatedAt}</p>
    </section>
  );
}
