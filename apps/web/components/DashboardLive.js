'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../store/dashboardSlice';
import { DashboardDataCard } from './DashboardDataCard';

export function DashboardLive() {
  const dispatch = useDispatch();
  const { loading, error, data, empty } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return <p className="state-panel">Loading dashboard data...</p>;
  }

  if (error) {
    return <p className="state-panel error-panel">Dashboard API error: {error}</p>;
  }

  if (empty || !data) {
    return <p className="state-panel">No dashboard data available.</p>;
  }

  return (
    <section className="dashboard-grid" aria-label="Dashboard sections">
      <DashboardDataCard title="Trading Session" value={data.tradingSession} />
      <DashboardDataCard title="Recommendation" value={data.recommendation} highlight />
      <DashboardDataCard title="Market Snapshot" value={data.marketSnapshot} />
      <DashboardDataCard title="Technical Snapshot" value={data.technicalSnapshot} />
      <DashboardDataCard title="Portfolio Summary" value={data.portfolioSummary} />
    </section>
  );
}
