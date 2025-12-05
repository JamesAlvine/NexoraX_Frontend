// src/app/features/hr/hr-list/hr-list.ts
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface HrStaff {
  id: number;
  email: string;
  department?: string;
  position?: string;
  hire_date?: string;
}

@Component({
  selector: 'app-hr-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-list.html',
  styleUrls: ['./hr-list.scss']
})
export class HrList implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  staff: HrStaff[] = [];
  errorMessage = '';

  ngOnInit() {
    this.loadStaff();
  }

  loadStaff() {
    this.api.get<HrStaff[]>('hr/staff/').subscribe({
      next: (data) => this.staff = data,
      error: (err) => this.errorMessage = 'Failed to load staff'
    });
  }

  addStaff() {
    this.router.navigate(['/admin/hr/staff/new']); // ✅ Now valid route
  }
}