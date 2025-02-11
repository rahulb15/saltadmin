// src/services/promocodeAPI.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const promocodeApi = createApi({
    reducerPath: "promocodeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/promocodes`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Promocode'],
    endpoints: (builder) => ({
        getPromocodes: builder.query({
            query: (params) => ({
                url: '/',
                method: 'GET',
                params,
            }),
            providesTags: ['Promocode'],
        }),

        createPromocode: builder.mutation({
            query: (promocode) => ({
                url: '/',
                method: 'POST',
                body: promocode,
            }),
            invalidatesTags: ['Promocode'],
        }),

        updatePromocode: builder.mutation({
            query: ({ id, updates }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: ['Promocode'],
        }),

        deletePromocode: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Promocode'],
        }),

        validatePromocode: builder.mutation({
            query: (data) => ({
                url: '/validate',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetPromocodesQuery,
    useCreatePromocodeMutation,
    useUpdatePromocodeMutation,
    useDeletePromocodeMutation,
    useValidatePromocodeMutation,
} = promocodeApi;
