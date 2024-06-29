import { Injectable } from '@angular/core';
import { ProductDetails } from '../app/Models/product-details';
import { Observable } from 'rxjs';
import { HttpclentwrapperService } from './httpclentwrapper.service';
import { RXDBService } from './rxdb.service';

@Injectable({
  providedIn: 'root'
})
export class DsrService {

  SelectedDate:Date;
  SelectedRetailer:string |undefined;
  ApiUrl="Dsr";


constructor(private httpclient:HttpclentwrapperService,private rxdbservice:RXDBService) { }
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
  return this.httpclient.put<ProductDetails>(`${this.ApiUrl}/${prod.dsr}`, prod);
}
async saveDsrDetails(data : any[]){
  try {
    
    for( const d of data){
      await this.rxdbservice.dsrCollection.insert(d);
    }
  } catch (error) {
    console.error(`Retailor INSERT ERROR ### ${error.message}`)
  }
  

}
}










