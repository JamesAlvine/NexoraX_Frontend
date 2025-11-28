// src/app/features/admin/admin-layout/admin-layout.ts
import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss']
})
export class AdminLayout {
  private router = inject(Router);
  isSidebarOpen = signal(true);

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  logout() {
    // TODO: Add logout API call
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}