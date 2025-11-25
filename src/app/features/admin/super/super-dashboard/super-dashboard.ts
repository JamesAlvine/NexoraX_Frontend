// src/app/features/admin/super/super-dashboard/super-dashboard.ts
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-super-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Super Admin Dashboard</h1>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <mat-card>
          <mat-card-content class="stat">
            <mat-icon color="primary">group</mat-icon>
            <div>
              <div class="stat-value">42</div>
              <div class="stat-label">Staff (HR)</div>
            </div>
          </mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-content class="stat">
            <mat-icon color="primary">volunteer_activism</mat-icon>
            <div>
              <div class="stat-value">128</div>
              <div class="stat-label">Volunteers</div>
            </div>
          </mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-content class="stat">
            <mat-icon color="primary">event</mat-icon>
            <div>
              <div class="stat-value">7</div>
              <div class="stat-label">Pending Leave</div>
            </div>
          </mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-content class="stat">
            <mat-icon color="primary">assessment</mat-icon>
            <div>
              <div class="stat-value">14</div>
              <div class="stat-label">Active Projects</div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Recent Activity -->
      <mat-card class="timeline">
        <mat-card-header>
          <mat-card-title>Recent Activity</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="activity-item" *ngFor="let item of recentActivity">
            <mat-icon>{{ item.icon }}</mat-icon>
            <div>
              <strong>{{ item.user }}</strong> {{ item.action }}
              <div class="time">{{ item.time }}</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container h1 {
      margin-bottom: 1.5rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .stat {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
    }
    .stat-label {
      color: #666;
    }
    .dark-theme .stat-label {
      color: #ccc;
    }
    .timeline {
      margin-top: 2rem;
    }
    .activity-item {
      display: flex;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
    }
    .dark-theme .activity-item {
      border-bottom-color: #333;
    }
    .time {
      font-size: 0.875rem;
      color: #999;
    }
    .dark-theme .time {
      color: #aaa;
    }
  `]
})
export class SuperDashboard {
  recentActivity = [
    { user: 'James', action: 'Approved leave for Sarah', time: '2 min ago', icon: 'check_circle' },
    { user: 'Admin', action: 'Added new volunteer', time: '15 min ago', icon: 'person_add' },
    { user: 'System', action: 'CRM sync completed', time: '1 hour ago', icon: 'sync' }
  ];
}