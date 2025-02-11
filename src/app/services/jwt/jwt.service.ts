import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtSubject = new BehaviorSubject<string>('');
  jwt$ = this.jwtSubject.asObservable();

  jwtDb?: string | null;
  constructor() {
    const jwt = this.jwtSubject.getValue();
    this.jwtDb = sessionStorage.getItem('jwt');
    if (this.jwtDb) {
      this.jwtSubject.next(JSON.parse(this.jwtDb));
    } else {
      sessionStorage.setItem('jwt', JSON.stringify(jwt || ''));
    }
  }

  setJwt(jwt: string) {
    this.jwtSubject.next(jwt);
    sessionStorage.setItem('jwt', JSON.stringify(jwt || ''));
  }
}
