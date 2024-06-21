import { Injectable } from '@angular/core';
import { UserDetails } from '../app/Models/user-details';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userDetailsSubject = new BehaviorSubject<UserDetails>(this.getUserDetailsFromSessionStorage());

  userDetails$ = this.userDetailsSubject.asObservable();

  constructor() { }

  setUserDetails(userDetails: UserDetails) {
    this.userDetailsSubject.next(userDetails);
    this.saveUserDetailsToSessionStorage(userDetails);
  }

  getUserDetails(): Observable<UserDetails> {
    return this.userDetailsSubject.asObservable();
  }

  private saveUserDetailsToSessionStorage(userDetails: UserDetails): void {
    sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  public getUserDetailsFromSessionStorage(): UserDetails | null {
    const userDetailsString = sessionStorage.getItem('userDetails');
    return userDetailsString ? JSON.parse(userDetailsString) : null;
  }

  clearUserDetails(): void {
    sessionStorage.removeItem('userDetails');
    this.userDetailsSubject.next(null);
  }
}
