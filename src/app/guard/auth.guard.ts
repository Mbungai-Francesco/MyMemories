import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { JwtService } from '../services/jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtServicwe: JwtService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.jwtServicwe.jwt$.pipe(
      map(res => {
        if (res) {
          return true; // Allow access
        } else {
          this.router.navigate(['/login']); // Redirect to login page
          return false;
        }
      })
    );
  }
}
