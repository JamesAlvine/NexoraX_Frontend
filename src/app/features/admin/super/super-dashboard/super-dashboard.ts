// Super Admin Dashboard with unique NGO styling
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './super-dashboard.html',
  styleUrls: ['./super-dashboard.scss']
})
export class SuperDashboard {
  private router = inject(Router);

  // Mock data – replace with API calls
  stats = {
    hr: 12,
    volunteers: 87,
    leavePending: 3,
    crmContacts: 240
  };

  // Module navigation
  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  // Optional: Enable drag-to-reorder in future
  onDragStart(event: DragEvent, module: string) {
    event.dataTransfer?.setData('module', module);
  }

  onDrop(event: DragEvent) {
    // Future: Save new order to DB
    event.preventDefault();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}