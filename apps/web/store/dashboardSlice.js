import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDashboardData } from '../services/api/dashboardApi.js';

const initialState = {
  loading: false,
  error: null,
  data: null,
  empty: false,
};

const isEmptyPayload = (payload) => {
  if (!payload) return true;
  if (Array.isArray(payload)) return payload.length === 0;
  if (typeof payload === 'object') return Object.keys(payload).length === 0;
  return false;
};

export const fetchDashboardData = createAsyncThunk('dashboard/fetchDashboardData', async () =>
  getDashboardData(),
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.empty = false;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.empty = isEmptyPayload(action.payload);
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Dashboard API unavailable';
        state.data = null;
        state.empty = false;
      });
  },
});

export const dashboardReducer = dashboardSlice.reducer;
