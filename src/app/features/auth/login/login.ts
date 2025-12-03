// src/app/features/auth/login/login.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    // Clear stale session data
    localStorage.removeItem('user');
    sessionStorage.clear();

    // Fetch CSRF token before login
    this.api.ensureCsrf().subscribe({
      next: () => {},
      error: (err) => {
        console.warn('CSRF fetch failed:', err);
        this.errorMessage = 'Security token missing. Please refresh the page.';
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.form.getRawValue();

    this.api.login(email, password).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        if (user.is_super_admin) {
          this.router.navigate(['/admin/super']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = typeof err === 'string' 
          ? err 
          : 'Invalid email or password. Please try again.';
        this.isLoading = false;
      }
    });
  }
}