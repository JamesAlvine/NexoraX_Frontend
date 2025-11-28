// src/app/features/volunteers/skill-matrix/skill-matrix.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

interface VolunteerMatrix {
  email: string;
  skills: string[];
  department_preferences: string[];
  experience_years: number;
  scores: { [key: string]: number };
  best_fit: string | null;
}

@Component({
  selector: 'app-skill-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-matrix.html',
  styleUrls: ['./skill-matrix.scss']
})
export class SkillMatrixComponent {
  private api = inject(ApiService);
  matrix: VolunteerMatrix[] = [];
  departments: string[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadSkillMatrix();
  }

  loadSkillMatrix() {
    this.api.get<VolunteerMatrix[]>('volunteers/skill-matrix/').subscribe({
      next: (data) => {
        this.matrix = data;
        if (data.length > 0) {
          this.departments = Object.keys(data[0].scores);
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getScoreColor(score: number): string {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  }
}