// src/app/features/admin/super/user-assignment/user-assignment.ts
import { Component, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  username: string;
  email: string;
}

@Component({
  selector: 'app-user-assignment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-assignment.html',
  styleUrl: './user-assignment.scss'
})
export class UserAssignmentComponent {
  private api = inject(ApiService);
  users: User[] = [];
  apps = ['HR', 'Volunteers', 'CRM', 'Leave'];
  message = '';

  ngOnInit() {
    this.api.get<User[]>('super/users/').subscribe(users => {
      this.users = users;
    });
  }

  onAppChange(event: Event, userId: number) {
    const select = event.target as HTMLSelectElement;
    const app = select.value;
    if (app) {
      this.assignApp(userId, app);
    }
  }

  assignApp(userId: number, app: string) {
    this.api.post('super/users/assign/', { user_id: userId, app_name: app }).subscribe({
      next: () => {
        this.message = 'Assignment saved';
      },
      error: () => {
        this.message = 'Failed to assign app';
      }
    });
  }
}