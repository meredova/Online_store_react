import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TBasketLS = {
    id:string,
    title:string,
    count: number,
    totalItemPrice: number,
    image: string,
    itemPrice: number
}
type TInitialState = {
    basketLS:TBasketLS[],
    totalPrice: number,
    totalBasketCount:number
}
const initialState: TInitialState = {
    basketLS: [],
    totalPrice: 0,
    totalBasketCount: 0,
}

export const basketSlice = createSlice({
    name: 'basketShop',
    initialState,
    reducers: {
        addProduct:(state, action:PayloadAction<TBasketLS>) => {

            const {id, totalItemPrice, count, image, title, itemPrice} = action.payload 

            localStorage.setItem(
                id.toString(), 
                JSON.stringify({
                    title, 
                    itemPrice,
                    totalItemPrice, 
                    count, 
                    image
                })
            )

            const savedItemKeys = Object.keys(localStorage);

            state.basketLS = savedItemKeys.map((id) => {
                const item = JSON.parse(localStorage.getItem(id));
                return {
                    id,
                    ...item,
                };
            });

            state.totalBasketCount = state.basketLS.reduce((acc, item) => {
                return acc + item.count;
            }, 0)

            state.totalPrice = parseFloat(state.basketLS.reduce((acc, item) => {
                return acc + item.totalItemPrice;
            }, 0).toFixed(2))
        },

        deleteProduct: (state, action:PayloadAction<number>) => {
            const productIdToDelete = action.payload.id.toString()
            if(localStorage.getItem(productIdToDelete)) {
                const item = JSON.parse(localStorage.getItem(productIdToDelete));

                if(item.count > 1) {
                    item.count -= 1
                    item.price -= item.price*item.count
                    state.totalPrice -= action.payload.itemPrice
                } else {
                    localStorage.removeItem(productIdToDelete);
                    state.totalPrice -= action.payload.totalItemPrice.toFixed(2) 
                }
            }
            state.totalBasketCount -= 1
        },

        loadBasketFromLS: (state) => {
            const savedItemKeys = Object.keys(localStorage);

            state.basketLS = savedItemKeys.map((id) => {
                const item = JSON.parse(localStorage.getItem(id));
                return {
                    id:Number(id),
                    ...item,
                };
            });
            state.totalPrice = parseFloat(state.basketLS.reduce((acc, item) => {
                return acc + item.totalItemPrice;
            }, 0).toFixed(2))
            state.totalBasketCount = state.basketLS.reduce((acc, item) => {
                return acc + item.count;
            }, 0)
        },
    },
  })
  
  export const { addProduct, deleteProduct, loadBasketFromLS } = basketSlice.actions
  
  export default basketSlice.reducer