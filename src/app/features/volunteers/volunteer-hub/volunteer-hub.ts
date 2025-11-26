// src/app/features/volunteers/volunteer-hub/volunteer-hub.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

interface Volunteer {
  user__email: string;
  skills: string[];
  availability: string;
  hours_contributed: number;
}

@Component({
  selector: 'app-volunteer-hub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volunteer-hub.html',
  styleUrl: './volunteer-hub.scss',
  changeDetection: ChangeDetectionStrategy.OnPush  // ✅ Now recognized
})
export class VolunteerHubComponent {
  private api = inject(ApiService);
  volunteers: Volunteer[] = [];

  ngOnInit() {
    this.api.get<Volunteer[]>('volunteers/').subscribe({
      next: (data) => this.volunteers = data,
      error: (err) => console.error('Failed to load volunteers:', err)
    });
  }
}