import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://localhost:5544/';
const API_URL = 'https://eri-backend.vercel.app/';

export const addSingleItem = createAsyncThunk('itemAuth/addItem', async ({ formData, token }) => {
  try {
    const response = await axios.post(`${API_URL}item/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return Promise.reject(error.response ? error.response.data : error.message);
  }
});


  const itemSlice = createSlice({
    name: 'itemAuth',
    initialState: {
      item:null,
      items:null,
      error: null,
      message: null,
      success: false,
      isLoading: false,
      currentPage: 1,
      totalPages: 1,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addSingleItem.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addSingleItem.fulfilled, (state, action) => {
          state.message = action.payload.message;
          state.success = action.payload.success;
          state.isLoading = false;
        })
        .addCase(addSingleItem.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default itemSlice.reducer;