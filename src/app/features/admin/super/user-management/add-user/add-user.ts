// src/app/features/admin/super/user-management/add-user/add-user.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../../core/services/api.service';

interface AppOption {
  id: number;
  name: string;
}

interface RoleOption {
  id: number;
  name: string;
  app_id: number;
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="add-user">
      <h1>Add New User</h1>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="user-form">
        <input formControlName="email" type="email" placeholder="Email" />
        
        <label>Assign Apps</label>
        <div class="app-list">
          @for (app of apps; track app.id) {
            <label>
              <input type="checkbox" [value]="app.id" (change)="toggleApp(app.id, $event)" />
              {{ app.name }}
            </label>
          }
        </div>

        <label>Role (per app)</label>
        <select formControlName="role_id">
          <option value="">-- Select Role --</option>
          @for (role of filteredRoles; track role.id) {
            <option [value]="role.id">{{ role.name }}</option>
          }
        </select>

        <div class="actions">
          <button type="submit" [disabled]="isLoading">Create User</button>
          <button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .add-user { max-width: 600px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 12px; }
    .add-user h1 { margin-bottom: 1.5rem; }
    .user-form { display: flex; flex-direction: column; gap: 1rem; }
    input, select { padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; }
    .app-list { display: flex; flex-wrap: wrap; gap: 1rem; }
    .app-list label { display: flex; align-items: center; gap: 0.5rem; }
    .actions { display: flex; gap: 1rem; }
    .actions button { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; }
    .actions button:first-child { background: #2563eb; color: white; }
    .actions button:last-child { background: #f1f5f9; }
  `]
})
export class AddUser {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    role_id: [0]
  });

  isLoading = false;
  apps: AppOption[] = [];
  roles: RoleOption[] = [];
  selectedAppIds: number[] = [];

  ngOnInit() {
    // In real app: fetch from API
    this.apps = [
      { id: 1, name: 'CRM' },
      { id: 2, name: 'HR' },
      { id: 3, name: 'Volunteers' },
      { id: 4, name: 'Leave' }
    ];
    this.roles = [
      { id: 1, name: 'Admin', app_id: 1 },
      { id: 2, name: 'Coordinator', app_id: 3 },
      { id: 3, name: 'Manager', app_id: 2 }
    ];
  }

  get filteredRoles() {
    if (this.selectedAppIds.length === 0) return [];
    const appId = this.selectedAppIds[0]; // Simplified: assign to first app
    return this.roles.filter(r => r.app_id === appId);
  }

  toggleApp(appId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedAppIds.push(appId);
    } else {
      this.selectedAppIds = this.selectedAppIds.filter(id => id !== appId);
    }
    this.form.patchValue({ role_id: 0 });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    // TODO: Call Django API to create user + assignments
    console.log('Create user:', this.form.value, 'Apps:', this.selectedAppIds);
    this.router.navigate(['/admin/super/users']);
  }

  cancel() {
    this.router.navigate(['/admin/super/users']);
  }
}