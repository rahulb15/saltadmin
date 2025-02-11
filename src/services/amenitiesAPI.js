// src/services/amenitiesAPI.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.REACT_APP_API_URL || 'http://your-api-url/api';

export const amenitiesApi = createApi({
    reducerPath: "amenitiesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Amenity'],
    endpoints: (builder) => ({
        getAmenities: builder.query({
            query: (params) => ({
                url: '/amenities',
                method: 'GET',
                params,
            }),
            providesTags: ['Amenity'],
        }),

        getAmenityById: builder.query({
            query: (id) => `/amenities/${id}`,
            providesTags: (result, error, id) => [{ type: 'Amenity', id }],
        }),

        createAmenity: builder.mutation({
            query: (amenityData) => ({
                url: '/amenities',
                method: 'POST',
                body: amenityData,
            }),
            invalidatesTags: ['Amenity'],
        }),

        updateAmenity: builder.mutation({
            query: ({ id, ...updates }) => ({
                url: `/amenities/${id}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Amenity', id }],
        }),

        deleteAmenity: builder.mutation({
            query: (id) => ({
                url: `/amenities/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Amenity'],
        }),

        toggleAmenityStatus: builder.mutation({
            query: (id) => ({
                url: `/amenities/${id}/toggle-status`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Amenity', id }],
        }),
    }),
});

export const {
    useGetAmenitiesQuery,
    useGetAmenityByIdQuery,
    useCreateAmenityMutation,
    useUpdateAmenityMutation,
    useDeleteAmenityMutation,
    useToggleAmenityStatusMutation,
} = amenitiesApi;