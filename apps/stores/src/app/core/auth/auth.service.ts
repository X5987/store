import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  readonly #isLoggedIn = signal(false);
  readonly isLoggedIn = this.#isLoggedIn.asReadonly();

  login(username: string, password: string): Observable<boolean> {
    const isLoggednIn: boolean =
      username.trim() === 'admin' && password.trim() === 'admin';
    this.#isLoggedIn.set(isLoggednIn);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    return of(isLoggednIn).pipe(delay(1000));
  }
}
