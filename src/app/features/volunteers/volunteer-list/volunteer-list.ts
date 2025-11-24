// frontend/src/app/features/volunteers/volunteer-list/volunteer-list.ts
import { Component } from '@angular/core';

interface Volunteer {
  id: number;
  email: string;
  skills: string[];
  availability: string;
  hours: number;
}

@Component({
  selector: 'app-volunteer-list',
  standalone: true,
  template: `
    <div class="module">
      <h1>Volunteers</h1>
      <div class="cards">
        @for (vol of volunteers; track vol.id) {
          <div class="vol-card">
            <h3>{{ vol.email }}</h3>
            <div class="skills">
              @for (skill of vol.skills; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
            <p><strong>Availability:</strong> {{ vol.availability || 'Not set' }}</p>
            <p><strong>Hours:</strong> {{ vol.hours }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .module { padding: 2rem; }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .vol-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
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
export class VolunteerList {
  volunteers: Volunteer[] = [
    {
      id: 1,
      email: 'volunteer1@ngo.org',
      skills: ['Teaching', 'First Aid'],
      availability: 'Weekends',
      hours: 45
    }
  ];
}