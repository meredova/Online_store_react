import { createSlice, createAsyncThunk, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from 'axios'

const BASE_API = 'https://fakestoreapi.com/products'

export const getProductsFromCategories = createAsyncThunk<TItems[], string, { rejectValue: string } >(
    'category/fetchProductFromCategories',
    async (category:string, { isRejectedWithValue: string }) => {
        try {
            const {data} = await axios.get<AxiosResponse<TItems[]>>(
                category === 'all' ?
                BASE_API 
                :
                BASE_API + `/category/${category}`)
            return data
        }
        catch(e) {
            console.log('error', e)
            return isRejectedWithValue('Failed to fetch products')
        }
    }
)

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

type TItems = {
    id:number,
    title:string,
    price:string,
    category:string,
    descriprion:string,
    image:string,
}

type TInitialState = {
    items:TItems[],
    searchItems:string,
    status:Status
}

const initialState: TInitialState = {
    items: [],
    searchItems: '',
    status:Status.LOADING
}

const productsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setSearchWord: (state, action:PayloadAction<string>) => {
            state.searchItems = action.payload
        },
        getSearchProducts: (state, action:PayloadAction<string>) => {
            state.items = state.items.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase()))
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProductsFromCategories.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        .addCase(getProductsFromCategories.rejected, (state, action) => {
            state.status = Status.ERROR
        })
        .addCase(getProductsFromCategories.pending, (state, action) => {
            state.status = Status.LOADING
        })
    }
})

export const { getSearchProducts, setSearchWord } = productsSlice.actions

export default productsSlice.reducer