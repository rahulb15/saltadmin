//src/services/featuredHotelAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const featuredHotelApi = createApi({
  reducerPath: 'featuredHotelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['FeaturedHotel'],
  endpoints: (builder) => ({
    getFeaturedHotels: builder.query({
      query: (params) => ({
        url: '/featured-hotels',
        method: 'GET',
        params,
      }),
      providesTags: ['FeaturedHotel'],
    }),

    getFeaturedHotelById: builder.query({
      query: (id) => `/featured-hotels/${id}`,
      providesTags: (result, error, id) => [{ type: 'FeaturedHotel', id }],
    }),

    createFeaturedHotel: builder.mutation({
      query: (data) => ({
        url: '/featured-hotels',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FeaturedHotel'],
    }),

    updateFeaturedHotel: builder.mutation({
      query: ({ id, data }) => ({
        url: `/featured-hotels/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'FeaturedHotel', id }],
    }),

    deleteFeaturedHotel: builder.mutation({
      query: (id) => ({
        url: `/featured-hotels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FeaturedHotel'],
    }),

    updatePositions: builder.mutation({
      query: (data) => ({
        url: '/featured-hotels/positions',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FeaturedHotel'],
    }),
    
    getAllHotels: builder.query({
      query: (params) => ({
        url: '/hotels',
        method: 'GET',
        params,
      }),
    }),

    getFeaturedBySection: builder.query({
      query: (sectionType) => `/featured-hotels/section/${sectionType}`,
      providesTags: (result, error, sectionType) => [
        { type: 'FeaturedHotel', id: `section-${sectionType}` }
      ],
    }),
  }),
});

export const {
  useGetFeaturedHotelsQuery,
  useGetFeaturedHotelByIdQuery,
  useCreateFeaturedHotelMutation,
  useUpdateFeaturedHotelMutation,
  useDeleteFeaturedHotelMutation,
  useUpdatePositionsMutation,
  useGetAllHotelsQuery,
  useGetFeaturedBySectionQuery,
} = featuredHotelApi;
