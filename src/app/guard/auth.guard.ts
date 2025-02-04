import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.user$.pipe(
      map(user => {
        if (user.id) {
          return true; // Allow access
        } else {
          this.router.navigate(['/login']); // Redirect to login page
          return false;
        }
      })
    );
  }
}
