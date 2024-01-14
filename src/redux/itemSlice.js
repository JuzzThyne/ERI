import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:5544/";
const API_URL = 'https://eri-backend.vercel.app/';

export const fetchItems = createAsyncThunk(
  "itemAuth/fetchItem",
  async ({ searchTerm, token, page = 1, limit = 10 }) => {
    try {
      const response = await axios.post(
        `${API_URL}item`,
        { searchTerm, page, limit },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Note the "Bearer" prefix
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const addSingleItem = createAsyncThunk(
  "itemAuth/addItem",
  async ({ formData, token }) => {
    try {
      const response = await axios.post(`${API_URL}item/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return Promise.reject(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const itemSlice = createSlice({
  name: "itemAuth",
  initialState: {
    item: null,
    items: null,
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
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.isLoading = false;
        state.error = null;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
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
