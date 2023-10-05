import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    value: 0,
    message: '',
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        showMessage: (state, action) => {
            state.message = action.payload
        } 
    }
})

export const { increment, decrement, showMessage } = counterSlice.actions

export default counterSlice.reducer