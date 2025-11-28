// user-create.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.html',
  styleUrls: ['./user-create.scss']
})
export class UserCreateComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  // ✅ Correctly typed form
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    is_super_admin: [false],
  });

  apps = ['HR', 'Volunteers', 'CRM', 'Leave'];
  selectedApps: string[] = [];
  message = '';
  isLoading = false;

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.message = '';

    const { email, password, is_super_admin } = this.form.getRawValue();

    this.api.post('users/create/', {
      email,
      password,
      is_super_admin,
      apps: this.selectedApps
    }).subscribe({
      next: () => {
        this.message = '✅ User created successfully';
        this.form.reset({ email: '', password: '', is_super_admin: false });
        this.selectedApps = [];
        this.isLoading = false;
      },
      error: (err) => {
        this.message = err?.error?.error || 'Failed to create user';
        this.isLoading = false;
      }
    });
  }

  toggleApp(app: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedApps.push(app);
    } else {
      this.selectedApps = this.selectedApps.filter(a => a !== app);
    }
  }

  isAppSelected(app: string): boolean {
    return this.selectedApps.includes(app);
  }
}