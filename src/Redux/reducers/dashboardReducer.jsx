// src/store/reducers/dashboardReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stats: {
        todayBookings: 0,
        totalAmount: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        growthRates: {
            bookings: 0,
            amount: 0,
            customers: 0,
            revenue: 0
        }
    },
    chartData: {
        confirmedBookings: [],
        pendingBookings: [],
        labels: []
    },
    loading: false,
    error: null
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setStats: (state, action) => {
            state.stats = action.payload;
        },
        setChartData: (state, action) => {
            state.chartData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setStats,
    setChartData,
    setLoading,
    setError
} = dashboardSlice.actions;

export default dashboardSlice.reducer;