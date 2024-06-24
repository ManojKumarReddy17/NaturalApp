import { HttpClient } from "@angular/common/http";
import { Product } from "../app/Models/product";
import { RXDBService } from "./rxdb.service";
import { RxCollection } from "rxdb";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import allProducts from "../Schemas/Products";
import { HttpclentwrapperService } from "./httpclentwrapper.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  allProductsCollection: RxCollection<Product, any, any>;

  ApiUrl = "Product";


  constructor( private rxdbService: RXDBService,private clent:HttpclentwrapperService) { 
    
  }

  getProducts(): Observable<Product[]> {
    return this.clent.get<Product[]>(this.ApiUrl);
  }
  

  async saveProducts(pData: Product[]) {
    try {
      
      for( const d of pData){
        await this.rxdbService.productCollection.insert(d);
      }
    } catch (error) {
      console.error(`PRODUCT INSERT ERROR ### ${error.message}`)
    }
    
    
  }

  private details = new BehaviorSubject<Product[]>(null); 
  getdetails = this.details.asObservable();
  
  DisplaySelectedProducts(product:Product[]){
    this.details.next(product);
    
  }
}
