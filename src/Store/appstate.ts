import { Product } from "../app/Models/product";
import { ProductDetails } from "../app/Models/product-details";


export interface AppState{
    products: Product[];
    productdetails:ProductDetails[];
}