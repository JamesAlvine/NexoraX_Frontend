// src/app/features/hr/hr-list/hr-list.ts
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hr-list',
  standalone: true,
  imports: [MatTableModule, MatCardModule],
  template: `
    <div class="dashboard-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>HR - Staff Management</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="staff" class="mat-elevation-z0">
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let element">{{ element.email }}</td>
            </ng-container>
            <ng-container matColumnDef="department">
              <th mat-header-cell *matHeaderCellDef>Department</th>
              <td mat-cell *matCellDef="let element">{{ element.department }}</td>
            </ng-container>
            <ng-container matColumnDef="position">
              <th mat-header-cell *matHeaderCellDef>Position</th>
              <td mat-cell *matCellDef="let element">{{ element.position }}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    table {
      width: 100%;
    }
    .mat-mdc-header-cell {
      font-weight: 600;
    }
  `]
})
export class HrList {
  displayedColumns = ['email', 'department', 'position'];
  staff = [
    { email: 'james@ngo.org', department: 'Admin', position: 'Super Admin' },
    { email: 'hr@ngo.org', department: 'Human Resources', position: 'Manager' }
  ];
}