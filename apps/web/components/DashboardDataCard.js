function formatLabel(label) {
  return label.replace(/([A-Z])/g, ' $1').replace(/^./, (value) => value.toUpperCase());
}

function renderValue(value) {
  if (value === null || value === undefined || value === '') {
    return <span className="muted">Unavailable</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="muted">Unavailable</span>;
    }

    return (
      <ul className="value-list">
        {value.map((item, index) => (
          <li key={`${index}-${String(item)}`}>{renderValue(item)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === 'object') {
    return (
      <dl className="detail-list">
        {Object.entries(value).map(([key, entry]) => (
          <div key={key}>
            <dt>{formatLabel(key)}</dt>
            <dd>{renderValue(entry)}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return <>{String(value)}</>;
}

export function DashboardDataCard({ title, value, highlight = false }) {
  return (
    <section
      className={`dashboard-card${highlight ? ' highlight-card' : ''}`}
      aria-labelledby={`${title.toLowerCase().replaceAll(' ', '-')}-title`}
    >
      <p className="card-kicker">REST API V2</p>
      <h2 id={`${title.toLowerCase().replaceAll(' ', '-')}-title`}>{title}</h2>
      {renderValue(value)}
    </section>
  );
}
