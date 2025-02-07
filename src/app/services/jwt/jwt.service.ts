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
    this.jwtDb = localStorage.getItem('jwt');
    if (this.jwtDb) {
      this.jwtSubject.next(JSON.parse(this.jwtDb))      
    } else {
      localStorage.setItem('jwt', JSON.stringify(jwt || ''));
    }
  }

  setJwt(jwt: string) {
    this.jwtSubject.next(jwt)
    localStorage.setItem('jwt', JSON.stringify(jwt || ''));
  }
  // updateJwt(jwt: string) {
  //   this.setJwt(jwt)
  //   localStorage.setItem('jwt', JSON.stringify(jwt))
  // }
}
