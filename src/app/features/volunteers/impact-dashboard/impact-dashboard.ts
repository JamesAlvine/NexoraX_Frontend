// src/app/features/volunteers/impact-dashboard/impact-dashboard.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { ImpactMapComponent } from '../impact-map/impact-map';

interface ImpactData {
  volunteers: number;
  hoursLogged: number;
  regions: string[];
  topSkills: string[];
}

@Component({
  selector: 'app-impact-dashboard',
  standalone: true,
  imports: [CommonModule, ImpactMapComponent],
  templateUrl: './impact-dashboard.html',
  styleUrls: ['./impact-dashboard.scss']
})
export class ImpactDashboardComponent implements OnInit {
  private api = inject(ApiService);
  data: ImpactData = { // ✅ Declare `data` with proper type
    volunteers: 0,
    hoursLogged: 0,
    regions: [],
    topSkills: []
  };
  isLoading = true;

  ngOnInit() {
    this.loadImpactData();
  }

  loadImpactData() {
    setTimeout(() => {
      this.data = {
        volunteers: 87,
        hoursLogged: 1240,
        regions: ['Nairobi', 'Mombasa', 'Kisumu'],
        topSkills: ['First Aid', 'Teaching', 'Translation']
      };
      this.isLoading = false;
    }, 800);
  }
}