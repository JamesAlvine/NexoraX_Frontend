import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beneficiary-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="form-container">
      <h2>Add New Beneficiary</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <input formControlName="unique_id" placeholder="Unique ID *" />
        <input formControlName="name" placeholder="Full Name *" />
        <input formControlName="phone" placeholder="Phone (Optional)" />
        <input formControlName="needs" placeholder="Needs (comma separated)" />
        <button type="submit" [disabled]="isLoading">
          {{ isLoading ? 'Saving...' : 'Save Beneficiary' }}
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
export class BeneficiaryFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form = this.fb.nonNullable.group({
    unique_id: ['', Validators.required],
    name: ['', Validators.required],
    phone: [''],
    needs: ['']
  });

  isLoading = false;
  message = '';

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.message = '';

    this.api.post('crm/beneficiaries/', this.form.value).subscribe({
      next: () => {
        this.message = 'Beneficiary saved successfully';
        this.form.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.message = err?.error?.error || 'Failed to save beneficiary';
        this.isLoading = false;
      }
    });
  }
}