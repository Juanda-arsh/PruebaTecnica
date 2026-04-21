import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, StoredAuth, UserResponse } from '../models/auth.models';

const AUTH_STORAGE_KEY = 'car-management-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authState = signal<StoredAuth | null>(this.readStoredAuth());

  readonly user = computed<UserResponse | null>(() => this.authState()?.user ?? null);
  readonly isAuthenticated = computed<boolean>(() => Boolean(this.authState()?.token));

  constructor(private readonly http: HttpClient) {}

  get token(): string | null {
    return this.authState()?.token ?? null;
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/auth/login`, payload).pipe(
      tap((response) => this.persistAuth(response))
    );
  }

  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/auth/register`, payload).pipe(
      tap((response) => this.persistAuth(response))
    );
  }

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.authState.set(null);
  }

  private persistAuth(response: AuthResponse): void {
    const nextAuth: StoredAuth = {
      token: response.token,
      user: response.user
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
    this.authState.set(nextAuth);
  }

  private readStoredAuth(): StoredAuth | null {
    try {
      return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? 'null') as StoredAuth | null;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  }
}
