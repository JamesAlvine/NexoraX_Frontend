import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donor-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="form-container">
      <h2>Add New Donor</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <input formControlName="name" placeholder="Full Name" />
        <input formControlName="email" type="email" placeholder="Email" />
        <input formControlName="phone" placeholder="Phone (Optional)" />
        <button type="submit" [disabled]="isLoading">
          {{ isLoading ? 'Saving...' : 'Save Donor' }}
        </button>
        @if (message) {
          <div class="alert">{{ message }}</div>
        }
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      background: var(--card);
      border-radius: var(--radius);
    }
    input {
      width: 100%;
      padding: 0.75rem;
      margin: 0.5rem 0;
      border: 1px solid var(--border);
      border-radius: 6px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
    }
    .alert {
      margin-top: 1rem;
      padding: 0.75rem;
      background: #dbeafe;
      color: #1d4ed8;
      border-radius: 6px;
    }
  `]
})
export class DonorFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['']
  });

  isLoading = false;
  message = '';

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.message = '';

    this.api.post('crm/donors/', this.form.value).subscribe({
      next: () => {
        this.message = 'Donor saved successfully';
        this.form.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.message = err?.error?.error || 'Failed to save donor';
        this.isLoading = false;
      }
    });
  }
}