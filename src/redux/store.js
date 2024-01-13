// store.js
import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './authSlice.js';
import itemAuthReducer from './itemSlice.js';

export const store = configureStore({
  reducer: {
    auth: userAuthReducer,
    item: itemAuthReducer,
    // Add more reducers as needed
  },
});