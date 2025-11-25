// src/app/features/hr/leave-request/leave-request.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="form-container">
      <h2>Request Leave</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <input formControlName="start_date" type="date" />
        <input formControlName="end_date" type="date" />
        <textarea formControlName="reason" placeholder="Reason for leave"></textarea>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  `,
  styles: [`
    .form-container { max-width: 500px; margin: 2rem auto; }
    input, textarea { width: 100%; padding: 0.75rem; margin: 0.5rem 0; }
    button { width: 100%; padding: 0.75rem; background: var(--primary); color: white; border: none; }
  `]
})
export class LeaveRequestComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form = this.fb.nonNullable.group({
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    reason: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.api.post('hr/leave/', this.form.value).subscribe(() => {
      alert('Leave request submitted');
    });
  }
}