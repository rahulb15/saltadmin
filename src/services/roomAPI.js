// src/services/roomAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL || 'http://your-api-url/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            if (headers.get('Content-Type') === 'application/json') {
                headers.set('Content-Type', 'application/json');
            }
            return headers;
        },
    }),
    tagTypes: ['Room'],
    endpoints: (builder) => ({
        // Get rooms with filtering and pagination
        getRooms: builder.query({
            query: (params) => ({
                url: '/room',
                method: 'GET',
                params,
            }),
            providesTags: ['Room'],
        }),

        // Get online room listings from eZee
        // getOnlineRooms: builder.query({
        //     query: ({ hotelId, params }) => ({
        //         url: `/rooms/listings/${hotelId}`,
        //         method: 'GET',
        //         params,
        //     }),
        // }),


        getOnlineRooms: builder.query({
            query: ({ hotelId, params }) => ({
                url: `/room/listings/${hotelId}`,
                method: 'GET',
                params: {
                    check_in_date: params.check_in_date,
                    check_out_date: params.check_out_date,
                    number_adults: params.number_adults,
                    number_children: params.number_children || 0
                }
            }),
            transformResponse: (response) => response.data,
        }),

        // Get single room by ID
        getRoomById: builder.query({
            query: (id) => `/room/${id}`,
            providesTags: (result, error, id) => [{ type: 'Room', id }],
        }),

        // Create new room
        createRoom: builder.mutation({
            query: (roomData) => ({
                url: '/room',
                method: 'POST',
                body: roomData,
            }),
            invalidatesTags: ['Room'],
        }),

        // Update room
        updateRoom: builder.mutation({
            query: ({ id, data }) => {
                const isFormData = data instanceof FormData;
                return {
                    url: `/room/${id}`,
                    method: 'PUT',
                    body: data,
                    formData: isFormData,
                    headers: isFormData ? {} : {
                        'Content-Type': 'application/json',
                    },
                };
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'Room', id },
                'Room'
            ],
        }),

        // Delete room
        deleteRoom: builder.mutation({
            query: (id) => ({
                url: `/room/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Room'],
        }),

        // Check room availability
        checkAvailability: builder.query({
            query: ({ roomId, startDate, endDate }) => ({
                url: `/room/${roomId}/availability`,
                method: 'GET',
                params: { startDate, endDate },
            }),
        }),
        selectRoom: builder.mutation({
            query: ({ hotelId, roomData }) => ({
                url: `/room/select-room/${hotelId}`,
                method: 'POST',
                body: { roomData }
            }),
            invalidatesTags: ['Room']
        }),
    }),
});

export const {
    useGetRoomsQuery,
    useGetOnlineRoomsQuery,
    useGetRoomByIdQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useCheckAvailabilityQuery,
    useSelectRoomMutation
} = roomApi;