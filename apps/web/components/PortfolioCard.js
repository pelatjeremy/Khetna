export function PortfolioCard({ portfolio }) {
  return (
    <section className="dashboard-card" aria-labelledby="portfolio-title">
      <p className="card-kicker">Portfolio</p>
      <h2 id="portfolio-title">{portfolio.title}</h2>
      <dl className="detail-list">
        <div>
          <dt>Allocation</dt>
          <dd>{portfolio.allocation}</dd>
        </div>
        <div>
          <dt>Exposure</dt>
          <dd>{portfolio.exposure}</dd>
        </div>
        <div>
          <dt>Cash</dt>
          <dd>{portfolio.cash}</dd>
        </div>
      </dl>
    </section>
  );
}
