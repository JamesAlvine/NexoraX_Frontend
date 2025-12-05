// src/app/features/hr/leave-request/leave-request.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './leave-request.html',
  styleUrls: ['./leave-request.scss']
})
export class LeaveRequestComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form = this.fb.nonNullable.group({
    staff_email: ['', [Validators.required, Validators.email]],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    reason: ['', [Validators.required, Validators.minLength(10)]]
  });

  message = '';
  errorMessage = '';
  isLoading = false;

  ngOnInit() {
    // Auto-fill current user's email if needed
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.message = '';
    this.errorMessage = '';

    this.api.post('hr/leave/', this.form.getRawValue()).subscribe({
      next: () => {
        this.message = '✅ Leave request submitted successfully';
        this.form.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Failed to submit leave request';
        this.isLoading = false;
      }
    });
  }
}