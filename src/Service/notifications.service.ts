import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private distributorApiUrl = 'http://3.110.27.195:5024/api/Notification/Notification';
  private executiveApiUrl = 'http://3.110.27.195:5024/api/Notification/Notifications';


  constructor(private http: HttpClient) { }

  getNotificationsByDistributorId(distributorId: string): Observable<any> {
    return this.http.get(`${this.distributorApiUrl}/DistributorId?DistributorId=${distributorId}`).pipe(
      catchError(this.handleError)
    );
  }

  getNotificationsByExecutiveId(executiveId: string): Observable<any> {
    return this.http.get(`${this.executiveApiUrl}/${executiveId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}
