import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hotelApi } from '../../services/hotelAPI';

export const fetchHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async () => {
    const response = await hotelApi.getAllHotels();
    return response;
  }
);

export const addHotel = createAsyncThunk(
  'hotels/addHotel',
  async (hotelData) => {
    const response = await hotelApi.createHotel(hotelData);
    return response;
  }
);

export const updateHotel = createAsyncThunk(
  'hotels/updateHotel',
  async ({ id, hotelData }) => {
    const response = await hotelApi.updateHotel(id, hotelData);
    return response;
  }
);

export const deleteHotel = createAsyncThunk(
  'hotels/deleteHotel',
  async (id) => {
    await hotelApi.deleteHotel(id);
    return id;
  }
);

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    hotels: [],
    loading: false,
    error: null,
    selectedHotel: null
  },
  reducers: {
    setSelectedHotel: (state, action) => {
      state.selectedHotel = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Hotels
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
        state.error = null;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Hotel
      .addCase(addHotel.fulfilled, (state, action) => {
        state.hotels.push(action.payload);
      })
      // Update Hotel
      .addCase(updateHotel.fulfilled, (state, action) => {
        const index = state.hotels.findIndex(hotel => hotel._id === action.payload._id);
        if (index !== -1) {
          state.hotels[index] = action.payload;
        }
      })
      // Delete Hotel
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter(hotel => hotel._id !== action.payload);
      });
  }
});

export const { setSelectedHotel } = hotelSlice.actions;
export default hotelSlice.reducer;