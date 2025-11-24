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
  templateUrl: './login.html',
  styleUrls: ['./login.scss'] 
})
export class Login {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
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
    this.api.login(email, password).subscribe({
      next: (user: LoginResponse) => {
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