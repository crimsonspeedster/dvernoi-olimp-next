import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {cartSlice} from "./cart";
import { createWrapper } from "next-redux-wrapper";
import {productSelectedSlice} from "@store/product";

const makeStore = () =>
    configureStore({
        reducer: {
            [cartSlice.name]: cartSlice.reducer,
            [productSelectedSlice.name]: productSelectedSlice.reducer
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);