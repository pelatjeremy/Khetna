import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  summary: {
    portfolioValue: '128 450 EUR',
    dailyChange: '+1.8%',
    openAnalyses: 4,
    watchlistItems: 12,
  },
  portfolio: {
    title: 'Portfolio',
    allocation: 'Balanced growth',
    exposure: '62% invested',
    cash: '38% cash',
  },
  market: {
    title: 'Market snapshot',
    mood: 'Constructive',
    trend: 'Major indexes are stable',
    updatedAt: 'Mocked today',
  },
  recommendation: {
    title: 'Current recommendation',
    label: 'Hold position',
    confidence: 'Medium',
    note: 'Waiting for clearer signals before action.',
  },
  history: [
    { id: 'analysis-1', title: 'Index review', status: 'Ready', date: '2026-07-01' },
    { id: 'analysis-2', title: 'Portfolio balance', status: 'Draft', date: '2026-06-30' },
    { id: 'analysis-3', title: 'Watchlist scan', status: 'Queued', date: '2026-06-29' },
  ],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export const dashboardReducer = dashboardSlice.reducer;
