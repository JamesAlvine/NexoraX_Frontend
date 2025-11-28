// frontend/src/app/core/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api/';

  private getCsrfToken(): string | null {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  ensureCsrf(): Observable<any> {
    return this.http.get(`${this.baseUrl}auth/csrf/`, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    const csrfToken = this.getCsrfToken();
    if (!csrfToken) {
      throw new Error('CSRF token not found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    });

    return this.http.post(
      `${this.baseUrl}auth/login/`,
      { email, password },
      { headers, withCredentials: true }
    ).pipe(
      catchError(e => throwError(() => 'Login failed'))
    );
  }

  get<T>(url: string): Observable<T> {
    const csrfToken = this.getCsrfToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {})
    });
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      headers,
      withCredentials: true
    }).pipe(
      catchError(e => throwError(() => 'API error'))
    );
  }

  post<T>(url: string, body: unknown): Observable<T> {
    const csrfToken = this.getCsrfToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {})
    });
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers,
      withCredentials: true
    }).pipe(
      catchError(e => throwError(() => 'API error'))
    );
  }
}