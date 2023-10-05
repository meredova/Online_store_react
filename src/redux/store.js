import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import basketReducer from './slices/basketSlice'
import productsReducer from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    basketShop: basketReducer,
    items: productsReducer,
    categories: categoriesReducer,
  },
})