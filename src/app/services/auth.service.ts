import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  signup(email: string, password: string, username: string): Observable<User> {
    // Implement actual authentication logic here
    return new Observable(subscriber => {
      const mockUser: User = {
        id: '1',
        email,
        username,
        isPremium: false
      };
      this.currentUserSubject.next(mockUser);
      subscriber.next(mockUser);
      subscriber.complete();
    });
  }

  upgradeToPremium(userId: string): Observable<User> {
    return new Observable(subscriber => {
      const currentUser = this.currentUserSubject.value;
      if (currentUser) {
        const upgradedUser = { ...currentUser, isPremium: true };
        this.currentUserSubject.next(upgradedUser);
        subscriber.next(upgradedUser);
      }
      subscriber.complete();
    });
  }
}