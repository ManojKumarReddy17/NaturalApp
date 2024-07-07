import { Injectable } from '@angular/core';
import { UserDetails } from '../app/Models/user-details';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userDetailsSubject = new BehaviorSubject<UserDetails>(this.getUserDetailsFromlocalStorage());

  userDetails$ = this.userDetailsSubject.asObservable();

  constructor() { }

  setUserDetails(userDetails: UserDetails) {
    this.userDetailsSubject.next(userDetails);
    this.saveUserDetailsTolocalStorage(userDetails);
  }

  getUserDetails(): Observable<UserDetails> {
    return this.userDetailsSubject.asObservable();
  }

  private saveUserDetailsTolocalStorage(userDetails: UserDetails): void {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  public getUserDetailsFromlocalStorage(): UserDetails | null {
    const userDetailsString = localStorage.getItem('userDetails');
    return userDetailsString ? JSON.parse(userDetailsString) : null;
  }

  clearUserDetails(): void {
    localStorage.removeItem('userDetails');
    this.userDetailsSubject.next(null);
  }
}
