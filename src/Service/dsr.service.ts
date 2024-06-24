import { Injectable } from '@angular/core';
import { ProductDetails } from '../app/Models/product-details';
import { Observable } from 'rxjs';
import { HttpclentwrapperService } from './httpclentwrapper.service';

@Injectable({
  providedIn: 'root'
})
export class DsrService {

  SelectedDate:Date;
  SelectedRetailer:string |undefined;
  ApiUrl="Dsr";


constructor(private httpclient:HttpclentwrapperService) { }
 Postproducts(prod:ProductDetails):Observable<ProductDetails>
 {
  return this.httpclient.post<ProductDetails>(this.ApiUrl,prod);
 }
 setdate(date:Date)
 {
  return this.SelectedDate =date;
 }
 getdate()
 {
  return this.SelectedDate;
 }
 setRetailor(name:string)
 {
  return this.SelectedRetailer =name;;
 }
 getRetailor()
 {
  return this.SelectedRetailer;
 }
 deleteDsr(id: string): Observable<any> {
  const url = `${this.ApiUrl}/${id}`;
  return this.httpclient.delete(url);
}
editProduct(prod: ProductDetails): Observable<ProductDetails> {
  return this.httpclient.put<ProductDetails>(`${this.ApiUrl}/${prod.id}`, prod);
}
/* editProduct(prod: ProductDetails): Observable<ProductDetails> {
  // Set the id of the product before sending the PUT request
  prod.id = 'DSR21174'; // Set the desired id here

  return this.httpclient.put<ProductDetails>(${this.ApiUrl}/${prod.id}, prod);
} */

}











