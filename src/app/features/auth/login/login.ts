// src/app/features/auth/login/login.ts
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  // ✅ Default error message matches XC360
  errorMessage = '';

  ngOnInit() {
    localStorage.removeItem('user');
    this.api.ensureCsrf().subscribe();
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.form.getRawValue();
    this.api.login(email, password).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        const redirect = user.is_super_admin ? '/admin/super' : '/user/dashboard';
        this.router.navigate([redirect]);
      },
      error: (err) => {
      
        this.errorMessage = 'Access Denied';
        this.isLoading = false;
      }
    });
  }
}