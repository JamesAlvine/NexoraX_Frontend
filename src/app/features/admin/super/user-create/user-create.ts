// src/app/features/admin/super/user-create/user-create.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.html',
  styleUrls: ['./user-create.scss']
})
export class UserCreateComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    is_super_admin: [false],
    organization: ['Neos NGO', Validators.required]
  });

  apps = ['HR', 'Volunteers', 'CRM'];
  selectedApps: string[] = [];

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password, is_super_admin, organization } = this.form.getRawValue();

    this.api.post('users/create/', {
      email,
      password,
      is_super_admin,
      organization,
      apps: this.selectedApps
    }).subscribe({
      next: () => {
        alert('User created successfully');
        this.router.navigate(['/admin/super/users']);
      },
      error: (err) => {
        alert(err?.error?.error || 'Failed to create user');
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

  cancel() {
    this.router.navigate(['/admin/super/users']);
  }
}