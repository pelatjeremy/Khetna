export function RecommendationCard({ recommendation }) {
  return (
    <section className="dashboard-card highlight-card" aria-labelledby="recommendation-title">
      <p className="card-kicker">Recommendation</p>
      <h2 id="recommendation-title">{recommendation.title}</h2>
      <strong className="recommendation-label">{recommendation.label}</strong>
      <p className="muted">Confidence: {recommendation.confidence}</p>
      <p className="card-copy">{recommendation.note}</p>
    </section>
  );
}
