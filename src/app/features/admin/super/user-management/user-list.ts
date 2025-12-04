//src/app/features/admin/super/user-management/user-list.ts
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';

interface UserItem {
  id: number;
  email: string;
  is_super_admin: boolean;
  organization: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserList implements OnInit {
  private router = inject(Router);
  private api = inject(ApiService);
  users: UserItem[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.api.get<UserItem[]>('users/').subscribe(users => {
      this.users = users.map(u => ({
        ...u,
        organization: u.organization || 'Neos NGO'
      }));
    });
  }

  addUser() {
    this.router.navigate(['/admin/super/users/new']);
  }
}