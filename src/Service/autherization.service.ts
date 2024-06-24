import { Injectable } from '@angular/core';
import { HttpclentwrapperService } from './httpclentwrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AutherizationService {
 

  loggedinUserRole:string;
  loggedinUserName:string;

  
  constructor(HttpclentwrapperServices:HttpclentwrapperService) { }
  setloginuserrole(user:string)
  {
    this.loggedinUserRole=user;
   console.log(this.loggedinUserRole);
  }
  setloginusername(name:string)
  {
    this.loggedinUserName=name;
  }
      
  getLoggedinUserRole()
  {
    return this.loggedinUserRole;
    
    console.log(this.loggedinUserRole);
  }
  getLoggedinUserName()
  {
    return this.loggedinUserName;
  }
  
}
