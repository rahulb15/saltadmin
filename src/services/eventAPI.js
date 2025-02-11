// src/services/eventAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const eventApi = createApi({
  reducerPath: 'eventApi',
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
  tagTypes: ['EventCategory', 'EventType', 'BanquetHall'],
  endpoints: (builder) => ({
    // Event Categories
    getCategories: builder.query({
      query: () => '/events/categories',
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'EventCategory', id: _id })),
              { type: 'EventCategory', id: 'LIST' },
            ]
          : [{ type: 'EventCategory', id: 'LIST' }],
    }),

    getCategoryBySlug: builder.query({
      query: (slug) => `/events/categories/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'EventCategory', id: slug }],
    }),

    createCategory: builder.mutation({
      query: (formData) => ({
        url: '/events/categories',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'EventCategory', id: 'LIST' }],
    }),

    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/events/categories/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'EventCategory', id },
        { type: 'EventCategory', id: 'LIST' },
      ],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/events/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'EventCategory', id },
        { type: 'EventCategory', id: 'LIST' },
      ],
    }),

    // Event Types
    addEventType: builder.mutation({
      query: ({ categoryId, formData }) => ({
        url: `/events/categories/${categoryId}/event-types`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: 'EventCategory', id: categoryId },
        { type: 'EventType', id: 'LIST' },
      ],
    }),

    updateEventType: builder.mutation({
      query: ({ categoryId, eventTypeId, formData }) => ({
        url: `/events/categories/${categoryId}/event-types/${eventTypeId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { categoryId, eventTypeId }) => [
        { type: 'EventCategory', id: categoryId },
        { type: 'EventType', id: eventTypeId },
      ],
    }),

    deleteEventType: builder.mutation({
      query: ({ categoryId, eventTypeId }) => ({
        url: `/events/categories/${categoryId}/event-types/${eventTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: 'EventCategory', id: categoryId },
        { type: 'EventType', id: 'LIST' },
      ],
    }),

    // Event Type Utilities
    getEventTypesByBanquetHall: builder.query({
      query: (banquetHallId) => `/events/event-types/banquet-hall/${banquetHallId}`,
      providesTags: (result, error, banquetHallId) => [
        { type: 'EventType', id: `HALL_${banquetHallId}` },
      ],
    }),

    searchEventTypes: builder.query({
      query: (searchParams) => ({
        url: '/events/event-types/search',
        params: searchParams,
      }),
      providesTags: ['EventType'],
    }),

    // Banquet Halls
    getBanquetHalls: builder.query({
      query: (params) => ({
        url: '/banquet-halls',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'BanquetHall', id: _id })),
              { type: 'BanquetHall', id: 'LIST' },
            ]
          : [{ type: 'BanquetHall', id: 'LIST' }],
    }),
    createBanquetHall: builder.mutation({
        query: (formData) => ({
          url: '/banquet-halls',
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: [{ type: 'BanquetHall', id: 'LIST' }],
      }),

      updateBanquetHall: builder.mutation({
        query: ({ id, formData }) => ({
          url: `/banquet-halls/${id}`,
          method: 'PUT',
          body: formData,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: 'BanquetHall', id },
          { type: 'BanquetHall', id: 'LIST' },
        ],
      }),
  
      deleteBanquetHall: builder.mutation({
        query: (id) => ({
          url: `/banquet-halls/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, id) => [
          { type: 'BanquetHall', id },
          { type: 'BanquetHall', id: 'LIST' },
        ],
      }),
  


    getBanquetHallById: builder.query({
      query: (id) => `/banquet-halls/${id}`,
      providesTags: (result, error, id) => [{ type: 'BanquetHall', id }],
    }),

    // Advanced Queries
    getCategoryWithEventTypes: builder.query({
      query: (categoryId) => `/events/categories/${categoryId}/details`,
      providesTags: (result, error, categoryId) => [
        { type: 'EventCategory', id: categoryId },
        { type: 'EventType', id: 'LIST' },
      ],
    }),

    getEventTypeDetails: builder.query({
      query: ({ categoryId, eventTypeId }) => 
        `/events/categories/${categoryId}/event-types/${eventTypeId}/details`,
      providesTags: (result, error, { categoryId, eventTypeId }) => [
        { type: 'EventCategory', id: categoryId },
        { type: 'EventType', id: eventTypeId },
      ],
    }),

    // Filtering and Search
    filterEventTypes: builder.query({
      query: (filterParams) => ({
        url: '/events/event-types/filter',
        params: filterParams,
      }),
      providesTags: ['EventType'],
    }),

    // Statistics and Dashboard Data
    getCategoryStats: builder.query({
      query: () => '/events/categories/stats',
      providesTags: ['EventCategory'],
    }),

    getEventTypeStats: builder.query({
      query: (categoryId) => `/events/categories/${categoryId}/stats`,
      providesTags: (result, error, categoryId) => [
        { type: 'EventCategory', id: categoryId },
        { type: 'EventType', id: 'LIST' },
      ],
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Event Categories
  useGetCategoriesQuery,
  useGetCategoryBySlugQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Event Types
  useAddEventTypeMutation,
  useUpdateEventTypeMutation,
  useDeleteEventTypeMutation,
  useGetEventTypesByBanquetHallQuery,
  useSearchEventTypesQuery,

  // Banquet Halls
  useGetBanquetHallsQuery,
  useGetBanquetHallByIdQuery,
  useCreateBanquetHallMutation,
  useUpdateBanquetHallMutation,
  useDeleteBanquetHallMutation,

  // Advanced Queries
  useGetCategoryWithEventTypesQuery,
  useGetEventTypeDetailsQuery,
  useFilterEventTypesQuery,

  // Statistics
  useGetCategoryStatsQuery,
  useGetEventTypeStatsQuery,
} = eventApi;