import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const isAuthenticated = this.firebaseService.getCurrentUser();
    console.log('isAuth', isAuthenticated);

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }

    return of(true);
  }
}
