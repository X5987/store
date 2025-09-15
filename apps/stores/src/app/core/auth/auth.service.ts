import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  readonly #isLoggedIn = signal(false);
  readonly isLoggedIn = this.#isLoggedIn.asReadonly();

  login(username: string | null, password: string | null): Observable<boolean> {
   if(username && password) {
     const isLoggednIn: boolean =
       username.trim() === 'admin' && password.trim() === 'admin';
     this.#isLoggedIn.set(isLoggednIn);
     localStorage.setItem('username', username);
     localStorage.setItem('password', password);
     return of(isLoggednIn).pipe(delay(1000));
   }
   return of(false);
  }
}
