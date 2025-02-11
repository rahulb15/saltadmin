// // src/services/blogAPI.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const API_URL = process.env.REACT_APP_API_URL || 'http://your-api-url/api';

// export const blogApi = createApi({
//   reducerPath: 'blogApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_URL,
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['Blog'],
//   endpoints: (builder) => ({
//     getBlogs: builder.query({
//       query: (params) => ({
//         url: '/blog/getBlogList',
//         method: 'GET',
//         params,
//       }),
//       providesTags: ['Blog'],
//     }),

//     getBlogById: builder.query({
//       query: (id) => `/blog/${id}`,
//       providesTags: (result, error, id) => [{ type: 'Blog', id }],
//     }),

//     createBlog: builder.mutation({
//       query: (formData) => ({
//         url: '/blog',
//         method: 'POST',
//         body: formData,
//       }),
//       invalidatesTags: ['Blog'],
//     }),

//     updateBlog: builder.mutation({
//       query: ({ id, formData }) => ({
//         url: `/blog/${id}`,
//         method: 'PUT',
//         body: formData,
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }],
//     }),

//     deleteBlog: builder.mutation({
//       query: (id) => ({
//         url: `/blog/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Blog'],
//     }),
//   }),
// });

// export const {
//   useGetBlogsQuery,
//   useGetBlogByIdQuery,
//   useCreateBlogMutation,
//   useUpdateBlogMutation,
//   useDeleteBlogMutation,
// } = blogApi;

// src/services/blogAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL || 'http://your-api-url/api';

export const blogApi = createApi({
  reducerPath: 'blogApi',
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
  tagTypes: ['Blog'],
  keepUnusedDataFor: 0, // Set to 0 to disable caching
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (params) => ({
        url: '/blog/getBlogList',
        method: 'GET',
        params,
      }),
      providesTags: ['Blog'],
      // Always refetch when component mounts
      refetchOnMount: true,
      // Always refetch when window regains focus
      refetchOnFocus: true,
      // Always refetch when reconnecting
      refetchOnReconnect: true,
    }),

    getBlogById: builder.query({
      query: (id) => `/blog/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
      refetchOnMount: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),

    createBlog: builder.mutation({
      query: (formData) => ({
        url: '/blog',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),

    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/blog/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;