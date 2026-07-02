import { AnalysisHistoryPreview } from '../components/AnalysisHistoryPreview';
import { DashboardSummary } from '../components/DashboardSummary';
import { MarketSnapshotCard } from '../components/MarketSnapshotCard';
import { PortfolioCard } from '../components/PortfolioCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { store } from '../store';

export default function HomePage() {
  const { dashboard } = store.getState();

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <p className="eyebrow">Sprint 17</p>
        <h1>TradeAI Dashboard</h1>
        <p>Mocked overview for the future workspace.</p>
      </header>

      <DashboardSummary summary={dashboard.summary} />

      <section className="dashboard-grid" aria-label="Dashboard sections">
        <PortfolioCard portfolio={dashboard.portfolio} />
        <MarketSnapshotCard market={dashboard.market} />
        <RecommendationCard recommendation={dashboard.recommendation} />
        <AnalysisHistoryPreview history={dashboard.history} />
      </section>
    </main>
  );
}
