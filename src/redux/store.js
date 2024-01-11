// store.js
import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './authSlice.js';
// import userAuthReducer from './userSlice.js';

export const store = configureStore({
  reducer: {
    auth: userAuthReducer,
    // user: userAuthReducer,
    // Add more reducers as needed
  },
});