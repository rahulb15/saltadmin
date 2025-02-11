// // src/services/dashboardAPI.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const dashboardApi = createApi({
//     reducerPath: 'dashboardApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: process.env.REACT_APP_API_URL || 'http://your-api-url/api',
//         prepareHeaders: (headers) => {
//             const token = localStorage.getItem("token");
//             if (token) {
//                 headers.set("Authorization", `Bearer ${token}`);
//             }
//             return headers;
//         },
//     }),
//     tagTypes: ['DashboardStats'],
//     endpoints: (builder) => ({
//         getDashboardStats: builder.query({
//             query: (params) => ({
//                 url: '/dashboard/stats',
//                 method: 'GET',
//                 params,
//             }),
//             providesTags: ['DashboardStats'],
//         }),
        
//         getBookingTrends: builder.query({
//             query: (params) => ({
//                 url: '/dashboard/booking-trends',
//                 method: 'GET',
//                 params,
//             }),
//             providesTags: ['DashboardStats'],
//         }),
        
//         getRevenueStats: builder.query({
//             query: (params) => ({
//                 url: '/dashboard/revenue',
//                 method: 'GET',
//                 params,
//             }),
//             providesTags: ['DashboardStats'],
//         }),
        
//         getCustomerStats: builder.query({
//             query: (params) => ({
//                 url: '/dashboard/customers',
//                 method: 'GET',
//                 params,
//             }),
//             providesTags: ['DashboardStats'],
//         }),
//     }),
// });

// export const {
//     useGetDashboardStatsQuery,
//     useGetBookingTrendsQuery,
//     useGetRevenueStatsQuery,
//     useGetCustomerStatsQuery,
// } = dashboardApi;


// src/services/dashboardAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL || 'http://your-api-url/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['DashboardStats'],
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: (params) => ({
                url: '/dashboard/stats',
                method: 'GET',
                params,
            }),
            providesTags: ['DashboardStats'],
        }),
        
        getBookingTrends: builder.query({
            query: (params) => ({
                url: '/dashboard/booking-trends',
                method: 'GET',
                params,
            }),
            providesTags: ['DashboardStats'],
        }),
        
        getRevenueStats: builder.query({
            query: (params) => ({
                url: '/dashboard/revenue',
                method: 'GET',
                params,
            }),
            providesTags: ['DashboardStats'],
        }),
        
        getCustomerStats: builder.query({
            query: (params) => ({
                url: '/dashboard/customers',
                method: 'GET',
                params,
            }),
            providesTags: ['DashboardStats'],
        }),

        getTodayBookings: builder.query({
            query: (params) => ({
                url: '/dashboard/today-bookings',
                method: 'GET',
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    search: params?.search || '',
                    sortField: params?.sortField || 'createdAt',
                    sortOrder: params?.sortOrder || 'desc'
                }
            }),
            providesTags: ['DashboardStats'],
            transformResponse: (response) => {
                // Transform the response if needed
                return response.data;
            },
        }),

        getRoomBookings: builder.query({
            query: (params) => ({
                url: '/dashboard/room-bookings',
                method: 'GET',
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    search: params?.search || '',
                    sortField: params?.sortField || 'createdAt',
                    sortOrder: params?.sortOrder || 'desc',
                    roomId: params?.roomId
                }
            }),
            providesTags: (result, error, arg) => 
                result
                    ? [
                        ...result.data.bookings.map(({ _id }) => ({ 
                            type: 'DashboardStats', 
                            id: _id 
                        })),
                        'DashboardStats'
                    ]
                    : ['DashboardStats'],
        }),

    }),
});

export const {
    useGetDashboardStatsQuery,
    useGetBookingTrendsQuery,
    useGetRevenueStatsQuery,
    useGetCustomerStatsQuery,
    useGetTodayBookingsQuery,
    useGetRoomBookingsQuery

} = dashboardApi;