import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpclentwrapperService } from './httpclentwrapper.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private distributorApiUrl = 'Notification/Notification';
  private executiveApiUrl = 'Notification/Notifications';


  constructor(private clent:HttpclentwrapperService) { }

  getNotificationsByDistributorId(distributorId: string): Observable<any> {
    return this.clent.get(`${this.distributorApiUrl}/DistributorId?DistributorId=${distributorId}`).pipe(
      catchError(this.handleError)
    );
  }

  getNotificationsByExecutiveId(executiveId: string): Observable<any> {
    return this.clent.get(`${this.executiveApiUrl}/${executiveId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}
