// frontend/src/app/features/admin/super/user-management/user-list.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `
    <div class="user-list-container">
      <div class="header">
        <h1>User Management</h1>
        <button class="btn-primary" (click)="goToAddUser()">+ Add User</button>
      </div>
      <p class="placeholder">User list will appear here.</p>
    </div>
  `,
  styles: [`
    .user-list-container { padding: 2rem; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    h1 { color: #1e293b; }
    .btn-primary {
      padding: 0.6rem 1.2rem;
      background: #1d4ed8;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }
    .placeholder { color: #64748b; }
  `]
})
export class UserList { // ✅ MUST be named "UserList"
  goToAddUser() {
    // Navigation handled by router
  }
}