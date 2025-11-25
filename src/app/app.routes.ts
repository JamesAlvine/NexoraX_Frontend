// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { SuperDashboard } from './features/admin/super/super-dashboard/super-dashboard';
import { OrganizationComponent } from './features/admin/super/organization/organization';
import { UserAssignmentComponent } from './features/admin/super/user-assignment/user-assignment';
import { HrList } from './features/hr/hr-list/hr-list';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'super', component: SuperDashboard },
      { path: 'super/organization', component: OrganizationComponent },
      { path: 'super/users', component: UserAssignmentComponent },
      { path: 'hr', component: HrList },
      { path: '', redirectTo: 'super', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];