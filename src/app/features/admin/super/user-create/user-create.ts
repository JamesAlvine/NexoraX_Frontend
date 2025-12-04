// src/app/features/admin/super/user-create/user-create.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.html',
  styleUrls: ['./user-create.scss']
})
export class UserCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = false;
  userId = 0;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', this.isEdit ? [] : [Validators.required, Validators.minLength(8)]],
    is_super_admin: [false],
    is_active: [true],
    organization: ['Neos NGO', Validators.required]
  });

  apps = ['HR', 'Volunteers', 'CRM'];
  selectedApps: string[] = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.userId = +id;
      this.loadUser();
    }
  }

  loadUser() {
    this.api.get<any>(`users/${this.userId}/`).subscribe(user => {
      this.form.patchValue({
        email: user.email,
        is_super_admin: user.is_super_admin,
        is_active: user.is_active,
        organization: user.organization
      });
      this.selectedApps = user.apps;
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = {
      ...this.form.getRawValue(),
      apps: this.selectedApps,
      ...(this.isEdit ? {} : { password: this.form.value.password })
    };

    if (this.isEdit) {
      this.api.put(`users/${this.userId}/`, data).subscribe(() => {
        alert('User updated successfully');
        this.router.navigate(['/admin/super/users']);
      });
    } else {
      this.api.post('users/create/', data).subscribe(() => {
        alert('User created successfully');
        this.router.navigate(['/admin/super/users']);
      });
    }
  }

  toggleApp(app: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedApps.push(app);
    } else {
      this.selectedApps = this.selectedApps.filter(a => a !== app);
    }
  }

  cancel() {
    this.router.navigate(['/admin/super/users']);
  }
}