// src/store/reducers/roomReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rooms: [],
    onlineRooms: [],
    selectedRoom: null,
    searchMode: 'local',
    searchParams: {
        checkInDate: '',
        checkOutDate: '',
        adults: 1,
        children: 0,
        hotelId: null,
    },
    pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    },
    loading: false,
    error: null,
};

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setSearchMode: (state, action) => {
            state.searchMode = action.payload;
            state.rooms = [];
            state.onlineRooms = [];
        },
        setSearchParams: (state, action) => {
            state.searchParams = {
                ...state.searchParams,
                ...action.payload,
            };
        },
        setPagination: (state, action) => {
            state.pagination = {
                ...state.pagination,
                ...action.payload,
            };
        },
        setSelectedRoom: (state, action) => {
            // Ensure we're setting a plain object
            state.selectedRoom = action.payload ? { ...action.payload } : null;
        },
        setLocalRooms: (state, action) => {
            state.rooms = action.payload;
        },
        setOnlineRooms: (state, action) => {
            state.onlineRooms = action.payload;
        },
        clearRooms: (state) => {
            state.rooms = [];
            state.onlineRooms = [];
        },
    },
});

export const {
    setSearchMode,
    setSearchParams,
    setPagination,
    setSelectedRoom,
    setLocalRooms,
    setOnlineRooms,
    clearRooms,
} = roomSlice.actions;

export default roomSlice.reducer;