// src/app/features/admin/admin-layout/admin-layout.ts
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material Modules (v20)
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss']
})
export class AdminLayout implements OnInit {
  private router = inject(Router);
  currentUser: any = null;
  unreadCount = 5;
  isDarkMode = false;
  isMobile = false;
  searchQuery = '';

  ngOnInit() {
    this.loadUser();
    this.loadDarkMode();
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  loadUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadDarkMode() {
    const saved = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode = saved;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    document.body.classList.toggle('dark-theme', this.isDarkMode);
    document.body.classList.toggle('light-theme', !this.isDarkMode);
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('darkMode');
    document.body.classList.remove('dark-theme', 'light-theme');
    this.router.navigate(['/login']);
  }

  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Search:', this.searchQuery);
    }
  }

  markAllAsRead() {
    this.unreadCount = 0;
  }
}