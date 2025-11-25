// src/app/features/admin/super/organization/organization.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';

interface Organization {
  id: number;
  name: string;
  contact_email: string;
  contact_phone: string;
  timezone: string;
}

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './organization.html',
  styleUrl: './organization.scss'
})
export class OrganizationComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    contact_email: ['', [Validators.required, Validators.email]],
    contact_phone: [''],
    timezone: ['Africa/Nairobi']
  });

  isLoading = false;
  message = '';

  ngOnInit() {
    this.api.get<Organization>('super/organization/').subscribe(org => {
      this.form.patchValue(org);
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.message = '';

    this.api.post('super/organization/', this.form.value).subscribe({
      next: () => {
        this.message = 'Organization updated successfully';
        this.isLoading = false;
      },
      error: () => {
        this.message = 'Failed to update organization';
        this.isLoading = false;
      }
    });
  }
}