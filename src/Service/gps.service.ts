import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Position } from '../app/Models/position';
import { HttpclentwrapperService } from './httpclentwrapper.service';
@Injectable({
  providedIn: 'root'
})
export class GpsService {
  private apiUrl = 'ExecutiveGPS/CreateOrUpdateExe';

  private executiveId="NEXE42314"; 

  constructor(private httpclient:HttpclentwrapperService) { }

  postPosition(executiveId: string, latitude: string, longitude: string): Observable<any> {
    const position = new Position(executiveId, latitude, longitude);
    return this.httpclient.post(this.apiUrl, position);
  }

  startPostingPosition(latitude: string, longitude: string): void {
    timer(1000).pipe(
      switchMap(() => this.postPosition(this.executiveId, latitude, longitude))
    ).subscribe(
      response => {
        console.log('Position posted successfully:', response);
      },
      error => {
        console.error('Error posting position:', error);
      }
    );
  }
}