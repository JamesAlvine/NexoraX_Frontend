// src/app/features/crm/crm-dashboard/crm-dashboard.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ApiService } from '../../../core/services/api.service';

interface CrmStats {
  donors: number;
  beneficiaries: number;
  interactions: number;
}

@Component({
  selector: 'app-crm-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './crm-dashboard.html',
  styleUrls: ['./crm-dashboard.scss']
})
export class CrmDashboardComponent implements OnInit {
  private api = inject(ApiService);
  stats: CrmStats = { donors: 0, beneficiaries: 0, interactions: 0 };
  isDarkMode = false;

  ngOnInit() {
    this.loadDarkMode();
    this.loadStats();
  }

  loadDarkMode() {
    this.isDarkMode = document.body.classList.contains('dark-theme');
  }

  loadStats() {
    this.api.get<CrmStats>('crm/dashboard/').subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Failed to load CRM stats:', err);
      }
    });
  }
}