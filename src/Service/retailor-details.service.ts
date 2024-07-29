import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RetailorDetails } from '../app/Models/retailor-details';
import { ProductDetails } from '../app/Models/product-details';
import { HttpclentwrapperService } from './httpclentwrapper.service';
import { RXDBService } from './rxdb.service';


@Injectable({
  providedIn: 'root'
})
export class RetailorDetailsService {

  apiUrl: string = 'Dsr/RetailorDetailsbyExeOrDisId?Id=';
  productsApiUrl = 'Dsr/ById/';
  assignedRetailorsbydistirbutorUrl = 'AssignRetailorToDistributor/Details';
  assignedRetailorsbyexecutiveUrl = 'Dsr/AssignedDetails';
  



  private userDetailsSubject = new BehaviorSubject<RetailorDetails>(this.getUserDetailsFromlocalStorage());
  userDetails$ = this.userDetailsSubject.asObservable();
  private infoButtonClickSubject = new BehaviorSubject<RetailorDetails | null>(null);
  infoButtonClick$ = this.infoButtonClickSubject.asObservable();
  
  constructor(private httpClient :HttpclentwrapperService,private rxdbservice:RXDBService) { }
  setdetails(infoButtonClickSubject: RetailorDetails) {
    this.infoButtonClickSubject.next(infoButtonClickSubject);
    this.saveUserDetailsTolocalStorage(infoButtonClickSubject);
  }
  private saveUserDetailsTolocalStorage(infoButtonClickSubject: RetailorDetails): void {
    localStorage.setItem('infoButtonClickSubject', JSON.stringify(infoButtonClickSubject));
  }
  public getUserDetailsFromlocalStorage(): RetailorDetails | null {
    const userDetailsString = localStorage.getItem('infoButtonClickSubject');
    return userDetailsString ? JSON.parse(userDetailsString) : null;
  }
  clearUserDetails(): void {
    localStorage.removeItem('infoButtonClickSubject');
    this.userDetailsSubject.next(null);
  }
  getRetailorsListByDistributorId(id: any): Observable<RetailorDetails> {
    return this.httpClient.get<RetailorDetails>(`${this.apiUrl}${id}`);
  }
  getRetailorsListByExecutiveId(executiveId: any): Observable<RetailorDetails[]> {
    return this.httpClient.get<RetailorDetails[]>(`${this.apiUrl}${executiveId}`);
  }
  getProductsById(id: any): Observable<ProductDetails> {
    return this.httpClient.get<ProductDetails>(`${this.productsApiUrl}${id}`);
  }
 
  getRetailorNamesbydistributor(id: any): Observable<any> {
    return this.httpClient.get(`${this.assignedRetailorsbydistirbutorUrl}/${id}`);
  }
  getRetailorNamesbyexecutive(id: any): Observable<any> {
    return this.httpClient.get(`${this.assignedRetailorsbyexecutiveUrl}/${id}`);
  }
 
  getRetailorsListByDate(distributorid: string, date: string): Observable<RetailorDetails[]> {
    const url = `Dsr/RetailorDetails/${distributorid}/${date}`;
    return this.httpClient.get<RetailorDetails[]>(url);
  }
  async saveRetailorDetails(data : any[]){
    try {
      
      for( const d of data){
        await this.rxdbservice.retailorCollection.insert(d);
      }
    } catch (error) {
      console.error(`Retailor INSERT ERROR ### ${error.message}`)
    }
    
  }
}






