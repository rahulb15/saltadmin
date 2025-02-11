// src/services/hotelApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.REACT_APP_API_URL || 'http://your-api-url/api';

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            // const token = localStorage.getItem("token");
            // if (token) {
            //     headers.set("Authorization", `Bearer ${token}`);
            // }
            // return headers;
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            // Don't set Content-Type header for FormData
            if (headers.get('Content-Type') === 'application/json') {
                headers.set('Content-Type', 'application/json');
            }
            return headers;
        },
    }),
    tagTypes: ['Hotel'],
    endpoints: (builder) => ({
        // Get all hotels with optional filtering
        getHotels: builder.query({
            query: (params) => ({
                url: '/hotels',
                method: 'GET',
                params,
            }),
            providesTags: ['Hotel'],
        }),

        // Get single hotel by ID
        getHotelById: builder.query({
            query: (id) => `/hotels/${id}`,
            providesTags: (result, error, id) => [{ type: 'Hotel', id }],
        }),

        // Create new hotel
        createHotel: builder.mutation({
            query: (hotelData) => ({
                url: '/hotels',
                method: 'POST',
                body: hotelData,
            }),
            invalidatesTags: ['Hotel'],
        }),

        // Update hotel
        // updateHotel: builder.mutation({
        //     query: ({ id, ...updates }) => ({
        //         url: `/hotels/${id}`,
        //         method: 'PUT',
        //         body: updates,
        //     }),
        //     invalidatesTags: (result, error, { id }) => [{ type: 'Hotel', id }],
        // }),

        updateHotel: builder.mutation({
            query: ({ id, data }) => {
                // Check if data is FormData
                const isFormData = data instanceof FormData;
                
                return {
                    url: `/hotels/${id}`,
                    method: 'PUT',
                    body: data,
                    // Don't stringify FormData
                    formData: isFormData,
                    // Prevent fetchBaseQuery from auto-setting Content-Type for FormData
                    headers: isFormData ? {} : {
                        'Content-Type': 'application/json',
                    },
                };
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'Hotel', id },
                'Hotel'
            ],
            // Add onQueryStarted to handle upload progress if needed
            async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Optionally handle successful update
                } catch (err) {
                    // Handle error if needed
                    console.error('Error updating hotel:', err);
                }
            },
        }),

        // New mutation for handling image uploads separately if needed
        uploadHotelImages: builder.mutation({
            query: ({ id, images }) => {
                const formData = new FormData();
                images.forEach(image => {
                    formData.append('hotelImages', image);
                });

                return {
                    url: `/hotels/${id}/images`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'Hotel', id },
                'Hotel'
            ],
        }),

        // Delete hotel
        deleteHotel: builder.mutation({
            query: (id) => ({
                url: `/hotels/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Hotel'],
        }),

        // Update hotel status
        updateHotelStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/hotels/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Hotel', id }],
        }),

        // Search hotels
        searchHotels: builder.query({
            query: (searchParams) => ({
                url: '/hotels/search',
                method: 'GET',
                params: searchParams,
            }),
            providesTags: ['Hotel'],
        }),

        // Get hotel statistics
        getHotelStats: builder.query({
            query: () => '/hotels/stats',
            providesTags: ['Hotel'],
        }),

        // Bulk operations
        bulkDeleteHotels: builder.mutation({
            query: (hotelIds) => ({
                url: '/hotels/bulk-delete',
                method: 'POST',
                body: { hotelIds },
            }),
            invalidatesTags: ['Hotel'],
        }),
    }),
});

export const {
    useGetHotelsQuery,
    useGetHotelByIdQuery,
    useCreateHotelMutation,
    useUpdateHotelMutation,
    useDeleteHotelMutation,
    useUpdateHotelStatusMutation,
    useSearchHotelsQuery,
    useGetHotelStatsQuery,
    useBulkDeleteHotelsMutation,
} = hotelApi;
