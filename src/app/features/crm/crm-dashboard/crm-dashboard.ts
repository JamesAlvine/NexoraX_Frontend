// frontend/src/app/features/crm/crm-dashboard/crm-dashboard.ts
import { Component, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

interface CrmStats {
  donors: number;
  beneficiaries: number;
  interactions: number;
}

@Component({
  selector: 'app-crm-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="crm-container">
      <h1>CRM Dashboard</h1>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">💌</div>
          <div>
            <div class="stat-label">Donors</div>
            <div class="stat-value">{{ stats.donors }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🧑‍🤝‍🧑</div>
          <div>
            <div class="stat-label">Beneficiaries</div>
            <div class="stat-value">{{ stats.beneficiaries }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📝</div>
          <div>
            <div class="stat-label">Interactions</div>
            <div class="stat-value">{{ stats.interactions }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .crm-container { padding: 2rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }
    .stat-card { display: flex; gap: 1rem; padding: 1.5rem; background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow); }
    .stat-icon { font-size: 2rem; }
    .stat-label { color: var(--text-secondary); font-size: 0.875rem; }
    .stat-value { font-size: 1.75rem; font-weight: 700; color: var(--primary); }
  `]
})
export class CrmDashboardComponent {
  private api = inject(ApiService);
  stats: CrmStats = { donors: 0, beneficiaries: 0, interactions: 0 };

  ngOnInit() {
    this.api.get<CrmStats>('crm/dashboard/').subscribe(stats => {
      this.stats = stats;
    });
  }
}