// src/app/features/admin/admin-layout/admin-layout.ts
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    CommonModule
  ],
  template: `
    <div class="layout-container" [class.dark-theme]="isDark()">
      <!-- Topbar -->
      <mat-toolbar class="topbar">
        <button mat-icon-button (click)="toggleSidebar()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>nexoraX Admin</span>
        <button mat-icon-button (click)="toggleDarkMode()">
          <mat-icon>{{ isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </mat-toolbar>

      <!-- Sidebar -->
      <mat-sidenav-container class="main-content">
        <mat-sidenav #sidenav mode="side" opened>
          <mat-nav-list>
            <a mat-list-item routerLink="/admin/super" routerLinkActive="active">
              <mat-icon>dashboard</mat-icon>
              <span>Dashboard</span>
            </a>
            <a mat-list-item routerLink="/admin/hr" routerLinkActive="active">
              <mat-icon>group</mat-icon>
              <span>HR (Staff)</span>
            </a>
            <a mat-list-item routerLink="/admin/volunteers" routerLinkActive="active">
              <mat-icon>volunteer_activism</mat-icon>
              <span>Volunteers</span>
            </a>
            <a mat-list-item routerLink="/admin/leave" routerLinkActive="active">
              <mat-icon>event</mat-icon>
              <span>Leave Requests</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .mat-sidenav {
      width: 260px;
    }
    .mat-toolbar {
      background: var(--mdc-theme-surface);
      color: var(--mdc-theme-on-surface);
    }
    .mat-list-item.active {
      background: rgba(0,0,0,0.04);
      font-weight: 600;
    }
    .dark-theme .mat-list-item.active {
      background: rgba(255,255,255,0.08);
    }
  `]
})
export class AdminLayout {
  private isDarkSignal = signal(false);
  protected isDark = this.isDarkSignal.asReadonly();

  toggleDarkMode() {
    const newMode = !this.isDarkSignal();
    this.isDarkSignal.set(newMode);
    document.body.classList.toggle('dark-theme', newMode);
    localStorage.setItem('darkMode', String(newMode));
  }

  toggleSidebar() {
    // Mobile toggle (optional)
  }

  ngOnInit() {
    const saved = localStorage.getItem('darkMode') === 'true';
    this.isDarkSignal.set(saved);
    if (saved) {
      document.body.classList.add('dark-theme');
    }
  }
}