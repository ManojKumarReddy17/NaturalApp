import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dsReports, Reports } from '../app/Models/reports';
import { Observable } from 'rxjs';
import { Areas } from '../app/Models/areas';
import { HttpclentwrapperService } from './httpclentwrapper.service';
import { RXDBService } from './rxdb.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl = 'DistributorLoginReports';
  private AreaUrl = 'Area';
  private DSrUrl='DSReport';
 private assignedDistributorsbyeexecutiveUrl='AssignDistributorToExecutive/Details';

  constructor(private client :HttpclentwrapperService, private rxdbService:RXDBService) { }

  getSalesReport(area: string,Distributor:string,startDate:string,endDate:string): Observable<Reports[]> {
    return this.client.get<Reports[]>(`${this.apiUrl}?Area=${area}&StartDate=${startDate}&EndDate=${endDate}&distributor=${Distributor}`);
  }
  getDsrReports(area:string,retailor:string,executive:string,distributor:string,startDate:string,endDate:string): Observable<dsReports[]>
{
  return this.client.get<dsReports[]>(`${this.DSrUrl}?Area=${area}&Retailor=${retailor}&Executive=${executive}&Distributor=${distributor}&StartDate=${startDate}&EndDate=${endDate}`)
}  
  // getSalesReport(area: string,Distributor:string,startDate:string,endDate:string): Observable<Reports[]> {
  //   return this.client.get<Reports[]>(`${this.apiUrl}?distributor=${Distributor}&StartDate=${startDate}&EndDate=${endDate}&Area=${area}`);
  // }
  getDistributorbyexecutive(id:any): Observable<any>{
    return this.client.get(`${this.assignedDistributorsbyeexecutiveUrl}/${id}`)
    }
  getAreas(): Observable<Areas[]> {
    return this.client.get<Areas[]>(this.AreaUrl);
  }

  
  async saveReports(data : any[]){
    try {
      
      for( const d of data){
        await this.rxdbService.reportsCollection.insert(d);
      }
    } catch (error) {
      console.error(`reports INSERT ERROR ### ${error.message}`)
    }
    
  } 
   
  async saveAreas(data : any[]){
    try {
      
      for( const d of data){
        await this.rxdbService.areasCollection.insert(d);
      }
    } catch (error) {
      console.error(`Areas INSERT ERROR ### ${error.message}`)
    }
    
  } 

}


