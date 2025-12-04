// src/app/features/admin/admin-layout/admin-layout.ts
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss']
})
export class AdminLayout implements OnInit {
  private router = inject(Router);
  currentUser: any = null;
  isDarkMode = false;
  isSidebarCollapsed = false;
  isMobile = false;
  searchQuery = '';
  unreadCount = 3;

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    } else {
      this.router.navigate(['/login']);
    }
    this.loadDarkMode();
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  loadDarkMode() {
    const saved = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode = saved;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 1024;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('darkMode');
    document.documentElement.classList.remove('dark');
    this.router.navigate(['/login']);
  }

  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Global Search:', this.searchQuery);
    }
  }

  quickCreate() {
    alert('Quick Create: Volunteer | Staff | Donor | Report');
  }

  markAllAsRead() {
    this.unreadCount = 0;
  }
}