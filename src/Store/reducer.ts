import { createReducer, on } from "@ngrx/store";
import { AppState } from "./appstate";
import { addProductDetails, addProducts, removeProduct, removeProductDetails, updateProductDetails, updatedProducts } from "./actions";
import { Product } from "../app/Models/product";

export const initialState: AppState = {
  products: [],
  productdetails: []
};

export const productReducer = createReducer(
  initialState,
  on(addProducts, (state, { products }) => ({
    ...state,
    products: [...state.products, products]
  })),
  on(updatedProducts, (state, { products }) => ({
    ...state,
    products: state.products.map(p => {
      const updatedProduct = products.find(prod => prod.id === p.id);
      return updatedProduct ? { ...p, ...updatedProduct } : p;
    })
  })),
  on(removeProduct, (state, { products }) => ({
    ...state,
    products: state.products.filter(p => p.id !== products.id)
  })),
  on(addProductDetails, (state, { productDetails }) => ({
    ...state,
    productdetails: [...state.productdetails, productDetails] 

  })),
  on(updateProductDetails, (state, { productDetails }) => ({
    ...state,
    productdetails: state.productdetails.map(pd => pd.id === productDetails.id ? { ...pd, ...productDetails } : pd)
  })),
  on(removeProductDetails, (state, { productId }) => ({
    ...state,
    productdetails: state.productdetails.filter(pd => pd.dsr !== productId)
  }))
);
