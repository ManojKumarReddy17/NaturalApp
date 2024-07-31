
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProfileService } from './profile.service';  // Adjusted path
import { UserDetails } from '../app/Models/user-details';
import { Position } from '../app/Models/position';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  private apiUrl = 'http://3.110.27.195:5024/api/ExecutiveGPS/CreateOrUpdateExe';
  
  //private apiUrl = 'https://localhost:7101/api/ExecutiveGPS/CreateOrUpdateExe';

  constructor(private http: HttpClient, private profileService: ProfileService) { }

  postPosition(executiveId: string, latitude: string, longitude: string): Observable<any> {
    const position = new Position(executiveId, latitude, longitude);
    return this.http.post(this.apiUrl, position);
  }

  startPostingPosition(latitude: string, longitude: string): void {
    this.profileService.getUserDetails().subscribe((userDetails: UserDetails | null) => {
      if (userDetails && userDetails.id) {
        timer(1000).pipe(
          switchMap(() => this.postPosition(userDetails.id, latitude, longitude))
        ).subscribe(
          response => {
            console.log('Position posted successfully:', response);
          },
          error => {
            console.error('Error posting position:', error);
          }
        );
      } else {
        console.error('User details are not available or executiveId is missing.');
      }
    });
  }
}
