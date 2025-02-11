// Redux/reducers/authReducer.jsx
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';

// Function to load initial state from localStorage
const loadInitialState = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    return {
        isAuthenticated: !!token,
        user: user ? JSON.parse(user) : null,
        token: token || null,
        error: null,
        loading: false
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: loadInitialState(),
    reducers: {
        setCredentials: (state, { payload }) => {
            state.user = payload.data;
            state.token = payload.token;
            state.isAuthenticated = true;
            // Store in localStorage
            localStorage.setItem('token', payload.token);
            localStorage.setItem('user', JSON.stringify(payload.data));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
        // New reducer to initialize auth state
        initializeAuth: (state) => {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (token && user) {
                state.isAuthenticated = true;
                state.token = token;
                state.user = JSON.parse(user);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.loading = false;
                    state.isAuthenticated = true;
                    state.user = payload.user;
                    state.token = payload.token;
                    // Store in localStorage
                    localStorage.setItem('token', payload.token);
                    localStorage.setItem('user', JSON.stringify(payload.user));
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchRejected,
                (state, { payload }) => {
                    state.loading = false;
                    state.error = payload?.error || 'Login failed';
                }
            );
    },
});

export const { setCredentials, logout, setError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
