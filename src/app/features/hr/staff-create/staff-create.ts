// hr/staff-create/staff-create.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" placeholder="Email" type="email" />
      <input formControlName="department" placeholder="Department" />
      <input formControlName="position" placeholder="Position" />
      <button type="submit">Create Staff</button>
    </form>
  `
})
export class StaffCreate {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: '',
    department: '',
    position: ''
  });

  onSubmit() {
    const { email, department, position } = this.form.getRawValue();
    this.api.post('users/create/', {
      email,
      user_type: 'staff',
      extra_data: { department, position }
    }).subscribe(() => {
      this.router.navigate(['/admin/hr']);
    });
  }
}