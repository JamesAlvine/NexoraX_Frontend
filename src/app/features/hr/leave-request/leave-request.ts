import { Component, inject } from '@angular/core';
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
export class LeaveRequestComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form = this.fb.nonNullable.group({
    staff_email: ['', [Validators.required, Validators.email]],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    reason: ['', Validators.required]
  });

  message = '';
  isLoading = false;

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.message = '';

    this.api.post('hr/leave/', this.form.value).subscribe({
      next: () => {
        this.message = '✅ Leave request submitted';
        this.form.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.message = err?.error?.error || 'Failed to submit leave request';
        this.isLoading = false;
      }
    });
  }
}