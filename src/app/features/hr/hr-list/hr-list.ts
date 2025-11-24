// frontend/src/app/features/hr/hr-list/hr-list.ts
import { Component, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

interface Staff {
  id: number;
  email: string;
  department: string;
  position: string;
}

@Component({
  selector: 'app-hr-list',
  standalone: true,
  template: `
    <div class="module">
      <h1>HR - Staff Management</h1>
      <table class="data-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          @for (staff of staffList; track staff.id) {
            <tr>
              <td>{{ staff.email }}</td>
              <td>{{ staff.department }}</td>
              <td>{{ staff.position }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .module { padding: 2rem; }
    .data-table { width: 100%; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .data-table th, .data-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #f1f5f9; }
    .data-table th { background: #f8fafc; font-weight: 600; }
  `]
})
export class HrList {
  private api = inject(ApiService);
  staffList: Staff[] = [];

  ngOnInit() {
    // TODO: Call real API: this.api.get<Staff[]>('hr/staff/').subscribe(...)
    this.staffList = [
      { id: 1, email: 'hr@ngo.org', department: 'Human Resources', position: 'Manager' }
    ];
  }
}