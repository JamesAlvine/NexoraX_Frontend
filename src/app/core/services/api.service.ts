// src/app/core/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api/';
  private csrfToken: string | null = null;

  // ✅ Global error handler
  errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();

  // ✅ Fetch CSRF token on app start
  ensureCsrf(): Observable<any> {
    return this.http.get(`${this.baseUrl}auth/csrf/`, { withCredentials: true }).pipe(
      catchError(err => {
        console.error('CSRF fetch failed', err);
        return throwError(() => 'Failed to get security token');
      })
    );
  }

  // ✅ Get CSRF token (with fallback to document.cookie)
  private getCsrfToken(): string | null {
    if (this.csrfToken) return this.csrfToken;
    
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        this.csrfToken = c.substring(name.length, c.length);
        return this.csrfToken;
      }
    }
    return null;
  }

  // ✅ Login with CSRF
  login(email: string, password: string): Observable<any> {
    // ✅ First, ensure CSRF token is available
    const csrf = this.getCsrfToken();
    if (!csrf) {
      return throwError(() => 'Security token missing. Please refresh the page.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf
    });

    return this.http.post(
      `${this.baseUrl}auth/login/`,
      { email, password },
      { 
        headers, 
        withCredentials: true // ✅ Critical for session cookies
      }
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // ✅ All other requests must send credentials
  get<T>(url: string): Observable<T> {
    const csrf = this.getCsrfToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(csrf ? { 'X-CSRFToken': csrf } : {})
    });
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      headers,
      withCredentials: true
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  post<T>(url: string, body: unknown): Observable<T> {
    const csrf = this.getCsrfToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(csrf ? { 'X-CSRFToken': csrf } : {})
    });
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers,
      withCredentials: true
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unexpected error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400: errorMsg = 'Bad Request'; break;
        case 401: errorMsg = 'Unauthorized - Please log in again'; break;
        case 403: errorMsg = 'Access Denied'; break;
        case 404: errorMsg = 'Resource not found'; break;
        case 500: errorMsg = 'Server Error'; break;
        default: errorMsg = `Error ${error.status}: ${error.message}`;
      }
    }
    this.errorMessageSubject.next(errorMsg);
    return throwError(() => errorMsg);
  }

  clearError() {
    this.errorMessageSubject.next(null);
  }
}