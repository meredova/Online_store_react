import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  basket: [],
  totalSum: 0,
  totalBasketCount: 0,
}

export const basketSlice = createSlice({
    name: 'basketShop',
    initialState,
    reducers: {
        addProduct:(state, action) => {

            let findProductById = state.basket.find (item => item.id === action.payload.id)
    
            if (findProductById) {
                findProductById.count++;
                findProductById.price += action.payload.price
            } else {
                state.basket = [...state.basket, action.payload]
            }

            state.totalSum = state.basket.reduce((acc, item) => {
                return acc + item.price;
            }, 0)

            state.totalBasketCount = state.basket.reduce((acc, item) => {
                return acc + item.count;
            }, 0)
        },
        deleteProduct: (state, action) => {
            let findProductById = state.basket.find (item => item.id === action.payload.id)
            if (findProductById) {
                if (findProductById.count === 1) {
                    state.basket = state.basket.filter(item => item.id !== action.payload.id);
                } else {
                    findProductById.count--;
                    findProductById.price -= action.payload.price;
                    state.basket = [...state.basket]
                }
            }
            state.totalSum = state.totalSum - findProductById.price

            state.totalBasketCount = state.totalBasketCount - 1
        },
    },
  })
  
  export const { addProduct, deleteProduct } = basketSlice.actions
  
  export default basketSlice.reducer