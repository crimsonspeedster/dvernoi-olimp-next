import {createSlice} from "@reduxjs/toolkit";
import { AppState } from "./store";
import PhotoPlaceholder from '@icons/clear_photo.png';
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import {variation_arrayProps} from "@components/SingleProduct/Intro/SingleProductContent";

interface SelectedProductProps {
    productPrice: string,
    productName: string,
    productImage: string,
    in_stock: boolean,
    productFull: ProductCardProps|variation_arrayProps|null
}

const initialState:SelectedProductProps = {
    productPrice: '0',
    productName: 'Test',
    productImage: PhotoPlaceholder.src,
    in_stock: true,
    productFull: null
}

export const productSelectedSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductSelectedName (state, action) {
            state.productName = action.payload;
        },
        setProductSelectedPrice (state, action) {
            state.productPrice = action.payload;
        },
        setProductSelectedImage (state, action) {
            state.productImage = action.payload;
        },
        setProductSelectedStock (state, action) {
            state.in_stock = action.payload;
        },
        setProductFull (state, action) {
            state.productFull = action.payload
        }
    }
});

export const { setProductSelectedName, setProductSelectedPrice, setProductSelectedImage, setProductSelectedStock, setProductFull } = productSelectedSlice.actions;

export const getProductSelectedName = (state: AppState) => state.product.productName
export const getProductSelectedPrice = (state: AppState) => state.product.productPrice;
export const getProductSelectedStock = (state: AppState) => state.product.in_stock;
export const getProductSelectedImage = (state: AppState) => state.product.productImage;
export const getProductSelectedFull = (state: AppState) => state.product.productFull;

export default productSelectedSlice.reducer;