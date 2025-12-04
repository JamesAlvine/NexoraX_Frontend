// src/app/features/crm/crm-dashboard/crm-dashboard.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crm-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crm-dashboard.html',
  styleUrls: ['./crm-dashboard.scss']
})
export class CrmDashboardComponent {
  stats = {
    donors: 240,
    beneficiaries: 1500,
    interactions: 3200
  };
}