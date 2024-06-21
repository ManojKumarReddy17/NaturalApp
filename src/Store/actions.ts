import { createAction, props } from "@ngrx/store";
import { Product } from "../app/Models/product";
import { ProductDetails } from "../app/Models/product-details";

export const loadProducts = createAction('[product] Load Products');
export const addProducts = createAction('[product] Add', props<{products: Product}>());




export const removeProduct = createAction('[product] Remove', props<{products: Product}>());
export const updatedProducts = createAction('[product] Update', props<{products: Product[]}>());
export const clear = createAction('[product] Clear'); 


export const loadProductDetails = createAction(
  '[Product Details] Load product details',
  props<{ productDetails: ProductDetails}>()
);


  export const addProductDetails = createAction(
    '[Product Details] Add',
    props<{ productDetails: ProductDetails }>() 
  );
  
  
  
  export const updateProductDetails = createAction(
    '[Product Details] Update',
    props<{ productDetails: ProductDetails }>()
  );
  
  export const removeProductDetails = createAction(
    '[Product Details] Remove',
    props<{ productId: ProductDetails }>()
  );















