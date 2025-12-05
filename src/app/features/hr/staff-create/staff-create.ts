// src/app/features/hr/staff-create/staff-create.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './staff-create.html',
  styleUrls: ['./staff-create.scss']
})
export class StaffCreateComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    department: ['HR', Validators.required],
    position: ['', Validators.required],
    hire_date: ['', Validators.required]
  });

  isSubmitting = false;
  errorMessage = '';

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.api.post('hr/staff/', this.form.getRawValue()).subscribe({
      next: () => {
        alert('✅ Staff created successfully!');
        this.router.navigate(['/admin/hr']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Failed to create staff';
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/admin/hr']);
  }
}