// src/app/features/hr/hr-list/hr-list.ts
import { Component, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

interface Staff {
  id: number;
  username: string;
  email: string;
}

@Component({
  selector: 'app-hr-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module">
      <h1>HR - Staff Directory</h1>
      <table class="data-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          @for (user of staff; track user.id) {
            <tr>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .module { padding: 2rem; }
    .data-table { width: 100%; background: var(--card); border-radius: var(--radius); }
    .data-table th, .data-table td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border); }
  `]
})
export class HrList {
  private api = inject(ApiService);
  staff: Staff[] = [];

  ngOnInit() {
    this.api.get<Staff[]>('hr/staff/').subscribe(data => {
      this.staff = data;
    });
  }
}