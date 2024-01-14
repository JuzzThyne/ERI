import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = import.meta.env.VITE_REACT_APP_BACKEND;
const API_URL = 'https://eri-backend.vercel.app/';

export const loginAsync = createAsyncThunk('userAuth/login', async (formData) => {
  try {
    const response = await axios.post(`${API_URL}user/login`, formData );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const logoutAsync = createAsyncThunk('adminAuth/logout', async (token) => {
  try {
    const response = await axios.post(`${API_URL}user/logout`, null , {
      headers: {
        Authorization: `Bearer ${token}`, // Note the "Bearer" prefix
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const authSlice = createSlice({
  name: 'userAuth',
  initialState: {
    token: sessionStorage.getItem('SecretToken') || null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
        // Set the isAuthenticated cookie
        sessionStorage.setItem('SecretToken', action.payload.token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.error = action.error.message;

        // Remove the token from localStorage
        sessionStorage.removeItem('SecretToken');
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        // Remove the token from localStorage
        sessionStorage.removeItem('SecretToken');
        state.error = action.payload.message;

      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;