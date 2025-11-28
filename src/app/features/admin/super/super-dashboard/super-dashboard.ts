// src/app/features/admin/super/super-dashboard/super-dashboard.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-dashboard',
  standalone: true,
  templateUrl: './super-dashboard.html',
  styleUrls: ['./super-dashboard.scss']
})
export class SuperDashboard {
  private router = inject(Router);

  // Mock stats (replace with API calls later)
  stats = {
    hr: 12,
    volunteers: 87,
    leavePending: 3,
    hoursLogged: 142,
    donors: 240,
    beneficiaries: 1500
  };

  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  showAddUserModal() {
    this.router.navigate(['/admin/super/users/new']);
  }
}