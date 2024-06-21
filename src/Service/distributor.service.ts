import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Login } from '../app/Models/Login';
import { UserDetails } from '../app/Models/user-details';


import { RXDBService } from './rxdb.service';
import { RxCollection } from 'rxdb';
import details from '../Schemas/Userdetails';


@Injectable({
  providedIn: 'root'
})
export class DistributorService {

userdetailsCollection: RxCollection<UserDetails, any, any>;

  ApiUrl = "http://3.110.27.195:5024/api/Distributor/Login";

  constructor(private httpClient: HttpClient, private rxdbService: RXDBService) {
    
  }


  getData(userdetails: Login): Observable<UserDetails> {
    return this.httpClient.post<UserDetails>(this.ApiUrl, userdetails);
  }

  async saveDistributordetails(data: any) {
    const UserdetailsById = await this.rxdbService.userDetailCollection.findOne({
      selector: {
        id: {
          $eq: data.id
        }
      }
  }).exec();
  console.info(`${JSON.stringify(UserdetailsById)} ## user id found`)
    if(UserdetailsById == null || UserdetailsById._data.id != data.id){
      await this.rxdbService.userDetailCollection.insert(data);
      console.log('User details inserted successfully:', data);
    }
    else{
      console.log('User details already exists:', UserdetailsById);
    }
  }


}