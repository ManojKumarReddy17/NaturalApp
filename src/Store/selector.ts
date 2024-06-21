import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./appstate";

export const selectAppState = createFeatureSelector<AppState>('orderFormSelectedProducts');

export const selectProducts = createSelector(
    selectAppState,
    (state: AppState) => state.products
);

export const selectProductName = createSelector(
    selectAppState,
    (state: AppState) => state.products
);
export const selectUpdatedProducts = createSelector(
    selectProducts,
    (products) => {
      const updatedProducts = products.map((product) => {
        if (product.id === 'specific_product_id') {
          return { ...product, propertyToUpdate: 'new_value' };
        } else {
          return product;
        }
      });
  
      return updatedProducts;
    }
)
export const selectProductToRemove = (state: AppState, props: { productId: string }) => {
    return state.products.find(product => product.id === props.productId);
  };
  
  export const selectUpdatedProductsAfterRemoval = createSelector(
    selectProducts, 
    selectProductToRemove, 
    (products, productToRemove) => {
      const updatedProducts = products.filter(product => product.id !== productToRemove.id);
      return updatedProducts;
    }
  );
