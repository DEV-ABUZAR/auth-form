import { configureStore } from '@reduxjs/toolkit';
import userSlice from './RegisterSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
