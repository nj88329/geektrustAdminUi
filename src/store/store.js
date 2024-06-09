import { configureStore } from '@reduxjs/toolkit';
import { adminApi } from '../services/adminApi';
import adminReducer from '../features/adminSlice'

export const store = configureStore({
    reducer: {
      
      [adminApi.reducerPath]: adminApi.reducer,
      admin : adminReducer
    },
    // Adding the api middleware enables caching
    // and other features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(adminApi.middleware),
  })