import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    return this._user() ? 'authenticated' : 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());

  isAdmin = computed(() => this._user()?.role === 'ADMIN');
  isResident = computed(() => this.user()?.role === 'RESIDENT');

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/login`, { email, password })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error) => this.handleAuthError(error)),
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/check-status`).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error) => this.handleAuthError(error)),
    );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');
    localStorage.setItem('token', token);
    return true;
  }

  private handleAuthError(error: unknown) {
    this.logout();
    console.error(error);
    return of(false);
  }
}
