import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetails } from '../app/Models/product-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DsrService {

  SelectedDate:Date;
  SelectedRetailer:string |undefined;
ApiUrl="http://3.110.27.195:5024/api/Dsr";


constructor(private httpclient:HttpClient) { }
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


}











