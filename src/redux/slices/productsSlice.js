import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getProductsByCategory = createAsyncThunk(
    'items/fetchProductsByCategory',
    async (category = '') => {
        try {
            const url = category
                ? `https://fakestoreapi.com/products/category/${category}`
                : 'https://fakestoreapi.com/products';

            const { data } = await axios.get(url);
            return data;
        } catch (e) {
            console.error('Error', e);
        }
    }
);

const initialState = {
    items: [],
    searchItems: ''
}

const productsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setSearchWord: (state, action) => {
            state.searchItems = action.payload
        },
        getSearchProducts: (state, action) => {
            state.items = state.items.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase()))
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProductsByCategory.fulfilled, (state, action) => {
            state.items = action.payload
        })
        // .addCase(getProductFromCategories.fulfilled, (state, action) => {
        //     state.items = action.payload
        // })
    }
})

export const { getSearchProducts, setSearchWord } = productsSlice.actions

export default productsSlice.reducer