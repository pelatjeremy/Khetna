export function AnalysisHistoryPreview({ history }) {
  return (
    <section className="dashboard-card history-card" aria-labelledby="history-title">
      <p className="card-kicker">Analysis</p>
      <h2 id="history-title">Recent analysis</h2>
      <ul className="history-list">
        {history.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <span>{item.date}</span>
            </div>
            <span className="status-text">{item.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
