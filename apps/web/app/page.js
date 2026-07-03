import { DashboardLive } from '../components/DashboardLive';

export default function HomePage() {
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <p className="eyebrow">Dashboard Live</p>
        <h1>TradeAI Dashboard</h1>
        <p>REST API V2 data rendered without frontend trading logic.</p>
      </header>

      <DashboardLive />
    </main>
  );
}
