// src/app/features/admin/super/super-dashboard/super-dashboard.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-super-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './super-dashboard.html',
  styleUrls: ['./super-dashboard.scss']
})
export class SuperDashboard {
  private router = inject(Router); // ✅ Inject Router

  stats = {
    volunteers: 87,
    staff: 12,
    donors: 240,
    impact: 1240
  };

  // ✅ Add navigateTo method
  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }
}