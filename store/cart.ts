import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import { AppState } from "./store";
import {CartServerDataProps} from "@pages/cart";

const initialState:CartServerDataProps = {
    items: [],
    total_amount: 0,
    total_items: 0,
    total_price: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItemsAmount (state, action) {
            state.total_amount = action.payload;
        },
        setCartServerData (state, action) {
            state.items = action.payload.items;
            state.total_amount = action.payload.total_amount;
            state.total_items = action.payload.total_items;
            state.total_price = action.payload.total_price;
        }
    }
});

export const { setCartItemsAmount, setCartServerData } = cartSlice.actions;

export const selectCartAmountState = (state: AppState) => state.cart.total_amount;
export const selectAllCartData = (state: AppState) => state.cart;

export default cartSlice.reducer;