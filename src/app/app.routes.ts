// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Auth
import { Login } from './features/auth/login/login';

// Admin Layout
import { AdminLayout } from './features/admin/admin-layout/admin-layout';

// Super Admin
import { SuperDashboard } from './features/admin/super/super-dashboard/super-dashboard';
import { OrganizationComponent } from './features/admin/super/organization/organization';
import { UserAssignmentComponent } from './features/admin/super/user-assignment/user-assignment';
import { UserCreateComponent } from './features/admin/super/user-create/user-create';

// HR
import { HrList } from './features/hr/hr-list/hr-list';
import { LeaveRequestComponent } from './features/hr/leave-request/leave-request';

// Volunteers
import { VolunteerHubComponent } from './features/volunteers/volunteer-hub/volunteer-hub';
import { VolunteerHourLogComponent } from './features/volunteers/volunteer-hour-log/volunteer-hour-log';
import { SkillMatrixComponent } from './features/volunteers/skill-matrix/skill-matrix';

// CRM
import { CrmDashboardComponent } from './features/crm/crm-dashboard/crm-dashboard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      // Super Admin
      { path: 'super', component: SuperDashboard },
      { path: 'super/organization', component: OrganizationComponent },
      { path: 'super/users', component: UserAssignmentComponent },
      { path: 'super/users/new', component: UserCreateComponent },

      // HR
      { path: 'hr', component: HrList },
      { path: 'hr/leave', component: LeaveRequestComponent },

      // Volunteers
      { path: 'volunteers/hub', component: VolunteerHubComponent },
      { path: 'volunteers/hour-log', component: VolunteerHourLogComponent },
      { path: 'volunteers/skill-matrix', component: SkillMatrixComponent },

      // CRM
      { path: 'crm', component: CrmDashboardComponent },

      // Default
      { path: '', redirectTo: 'super', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];