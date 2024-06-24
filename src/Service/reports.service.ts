import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reports } from '../app/Models/reports';
import { Observable } from 'rxjs';
import { Areas } from '../app/Models/areas';
import { HttpclentwrapperService } from './httpclentwrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = 'DSReport';
  private AreaUrl = 'Area';

  constructor(private client :HttpclentwrapperService) { }

  getSalesReport(area: string, endDate: string): Observable<Reports[]> {
    return this.client.get<Reports[]>(`${this.apiUrl}?Area=${area}&EndDate=${endDate}`);
  }
  getAreas(): Observable<Areas[]> {
    return this.client.get<Areas[]>(this.AreaUrl);
  }

}
