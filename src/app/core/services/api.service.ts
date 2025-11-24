// frontend/src/app/core/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8000/api/';

  private getCsrfToken(): string | null {
    return document.cookie.split(';').find(c => c.trim().startsWith('csrftoken='))?.split('=')[1] || null;
  }

  private buildHeaders(): HttpHeaders {
    const csrf = this.getCsrfToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(csrf ? { 'X-CSRFToken': csrf } : {})
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}auth/login/`,
      { email, password },
      {
        headers: this.buildHeaders(),
        withCredentials: true
      }
    ).pipe(catchError(e => throwError(() => 'Login failed')));
  }

  ensureCsrf(): Observable<any> {
    return this.http.get(`${this.baseUrl}auth/csrf/`, { withCredentials: true });
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      headers: this.buildHeaders(),
      withCredentials: true
    }).pipe(catchError(e => throwError(() => 'API error')));
  }

  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers: this.buildHeaders(),
      withCredentials: true
    }).pipe(catchError(e => throwError(() => 'API error')));
  }
}