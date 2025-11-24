// src/app/features/admin/super/super-dashboard/super-dashboard.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';

interface DashboardStats {
  organizations: number;
  total_users: number;
  active_apps: number;
  zoho_integrations: number;
}

@Component({
  selector: 'app-super-dashboard',
  standalone: true,
  template: `
    <div class="super-dashboard">
      <h1>Super Admin Console</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🏢</div>
          <div>
            <div class="stat-label">Organizations</div>
            <div class="stat-value">{{ stats.organizations }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div>
            <div class="stat-label">Total Users</div>
            <div class="stat-value">{{ stats.total_users }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔌</div>
          <div>
            <div class="stat-label">Active Apps</div>
            <div class="stat-value">{{ stats.active_apps }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔗</div>
          <div>
            <div class="stat-label">Zoho Integrations</div>
            <div class="stat-value">{{ stats.zoho_integrations }}</div>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <button (click)="navigate('/admin/super/users')">👥 Manage Users</button>
          <button (click)="navigate('/admin/super/apps')">⚙️ Configure Apps</button>
          <button (click)="navigate('/admin/super/org')">🏢 Organization Setup</button>
          <button (click)="navigate('/admin/super/security')">🔒 Global Security</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .super-dashboard { padding: 2rem; }
    .super-dashboard h1 { margin-bottom: 2rem; color: #1e293b; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
    .stat-card { display: flex; gap: 1rem; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .stat-icon { font-size: 2rem; }
    .stat-label { color: #64748b; font-size: 0.875rem; }
    .stat-value { font-size: 1.75rem; font-weight: 700; color: #2563eb; }
    .quick-actions h2 { margin-bottom: 1.5rem; }
    .actions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .actions-grid button { padding: 1rem; background: #f1f5f9; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; text-align: left; }
    .actions-grid button:hover { background: #e2e8f0; }
  `]
})
export class SuperDashboard {
  private api = inject(ApiService);
  private router = inject(Router);

  stats: DashboardStats = {
    organizations: 0,
    total_users: 0,
    active_apps: 0,
    zoho_integrations: 0
  };

  ngOnInit() {
    this.api.get<DashboardStats>('super/dashboard/').subscribe((data) => {
      this.stats = data;
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}