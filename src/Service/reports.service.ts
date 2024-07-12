import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reports } from '../app/Models/reports';
import { Observable } from 'rxjs';
import { Areas } from '../app/Models/areas';
import { HttpclentwrapperService } from './httpclentwrapper.service';
import { RXDBService } from './rxdb.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = 'DSReport';
  private AreaUrl = 'Area';

  constructor(private client :HttpclentwrapperService, private rxdbService:RXDBService) { }

  getSalesReport(area: string, endDate: string,startDate:string): Observable<Reports[]> {
    return this.client.get<Reports[]>(`${this.apiUrl}?Area=${area}&EndDate=${endDate}&StartDate=${startDate}`);
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
