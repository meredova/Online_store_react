import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlice.ts'
import productsReducer from './slices/productsSlice.ts'
import categoriesReducer from './slices/categoriesSlice.ts'

export const store = configureStore({
  reducer: {
    basketShop: basketReducer,
    items: productsReducer,
    categories: categoriesReducer,
  },
})