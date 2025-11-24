// frontend/src/app/features/auth/login/login.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

interface LoginResponse {
  id: number;
  email: string;
  is_super_admin: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-container">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="login-form">
        <input formControlName="email" placeholder="Email" type="email" />
        <input formControlName="password" placeholder="Password" type="password" />
        <button type="submit" [disabled]="isLoading">Sign In</button>
        @if (errorMessage) {
          <div class="error">{{ errorMessage }}</div>
        }
      </form>
    </div>
  `,
  styles: [`
    .login-container { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .login-form { display: flex; flex-direction: column; gap: 1rem; width: 300px; }
    input { padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 4px; }
    button { padding: 0.75rem; background: #2563eb; color: white; border: none; border-radius: 4px; }
    .error { color: red; text-align: center; }
  `]
})
export class Login {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  isLoading = false;
  errorMessage = '';

  constructor() {
    this.api.ensureCsrf().subscribe();
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.form.getRawValue();
    // ✅ Explicitly type response
    this.api.post<LoginResponse>('auth/login/', { email, password }).subscribe({
      next: (user) => {
        console.log('Login success:', user);
        if (user.is_super_admin) {
          this.router.navigate(['/admin/super']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password.';
        this.isLoading = false;
      }
    });
  }
}