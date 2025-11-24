// src/app/features/admin/super/user-management/user-list.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

interface UserItem {
  id: number;
  email: string;
  is_super_admin: boolean;
  organization: string | null;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `
    <div class="user-management">
      <div class="page-header">
        <h1>User Management</h1>
        <button (click)="addUser()">+ Add User</button>
      </div>

      <table class="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Organization</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (user of users; track user.id) {
            <tr>
              <td>{{ user.email }}</td>
              <td>{{ user.organization || '—' }}</td>
              <td>
                @if (user.is_super_admin) {
                  <span class="role-badge super">Super Admin</span>
                } @else {
                  <span class="role-badge user">User</span>
                }
              </td>
              <td>
                <button>Edit</button>
                <button class="danger">Deactivate</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .user-management { padding: 2rem; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .page-header h1 { color: #1e293b; }
    .page-header button { padding: 0.6rem 1.2rem; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: 600; }
    .user-table { width: 100%; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .user-table th, .user-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
    .user-table th { background: #f8fafc; font-weight: 600; color: #475569; }
    .role-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.875rem; font-weight: 600; }
    .role-badge.super { background: #dbeafe; color: #1d4ed8; }
    .role-badge.user { background: #f1f5f9; color: #475569; }
    .danger { background: #fee2e2; color: #b91c1c; margin-left: 0.5rem; }
  `]
})
export class UserList {
  private router = inject(Router);
  users: UserItem[] = [];

  ngOnInit() {
    // TODO: Replace with real API call: this.api.get<UserItem[]>('super/users/').subscribe(...)
    this.users = [
      { id: 1, email: 'neossiriusngo@gmail.com', is_super_admin: true, organization: 'Neos NGO' },
      { id: 2, email: 'staff@ngo.org', is_super_admin: false, organization: 'Neos NGO' },
      { id: 3, email: 'volunteer@ngo.org', is_super_admin: false, organization: 'Neos NGO' }
    ];
  }

  addUser() {
    this.router.navigate(['/admin/super/users/new']);
  }
}