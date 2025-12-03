// src/app/features/admin/super/super-dashboard/super-dashboard.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-super-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './super-dashboard.html',
  styleUrls: ['./super-dashboard.scss']
})
export class SuperDashboard {
  private router = inject(Router);

  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }
}