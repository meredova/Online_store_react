import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from 'axios'

export const getCategories = createAsyncThunk<string[], string, { rejectValue: string }>(
    'category/fetchCategories',
    async () => {
        try {
            const {data} = await axios.get<AxiosResponse<string[]>>('https://fakestoreapi.com/products/categories')
            return data
        }
        catch(e) {
            console.log('error', e)
            return isRejectedWithValue('Failed to fetch products')
        }
    }
)

type TInitialState = {
    items?:string[],
    selectedCategory:string
}

const initialState: TInitialState = {
    items: [],
    selectedCategory: 'all',
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})

export const { setSelectedCategory } = categoriesSlice.actions

export default categoriesSlice.reducer