import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Login } from '../app/Models/Login';
import { UserDetails } from '../app/Models/user-details';
import { RetailorDetails } from '../app/Models/retailor-details';
import { HttpclentwrapperService } from './httpclentwrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveService {
  baseurl = "Dsr/ExecId?ExecId=";
  private apiUrl = 'Executive/Login';
  private executivearea ="Executive/exid?exip=";
  constructor(private client:HttpclentwrapperService) { }
  getexecutivearea(id:any):Observable<any>{
   return this.client.get<any>(`${this.executivearea}${id}`)
  }//
  getData(userDetails: Login): Observable<UserDetails> {
    return this.client.post<UserDetails>(this.apiUrl, userDetails);
  }
  getRetailorsListById(id: any): Observable<RetailorDetails> {
    return this.client.get<RetailorDetails>(`${this.baseurl}${id}`);
  } 
}
