// src/app/features/volunteers/volunteer-hub/volunteer-hub.ts
import { Component, inject } from '@angular/core';
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
  template: `
    <div class="hub-container">
      <h1>Volunteer Hub</h1>
      <div class="cards">
        @for (vol of volunteers; track vol.user__email) {
          <div class="card">
            <h3>{{ vol.user__email }}</h3>
            <div class="skills">
              @for (skill of vol.skills; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
            <p><strong>Availability:</strong> {{ vol.availability || 'Not set' }}</p>
            <p><strong>Hours:</strong> {{ vol.hours_contributed }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .hub-container { padding: 2rem; }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
    .card {
      background: var(--card);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--shadow);
    }
    .skills { margin: 1rem 0; }
    .skill-tag {
      display: inline-block;
      background: #dbeafe;
      color: #1d4ed8;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  `]
})
export class VolunteerHubComponent {
  private api = inject(ApiService);
  volunteers: Volunteer[] = [];

  ngOnInit() {
    this.api.get<Volunteer[]>('volunteers/').subscribe(data => {
      this.volunteers = data;
    });
  }
}