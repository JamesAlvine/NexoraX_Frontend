// #4: Application Routes (TypeScript)
// Purpose: Define all routes for the NGO platform
// Structure: Login → Admin Layout (with sub-routes)
// Features: Role-based paths (Super Admin, HR, Volunteers)

import { Routes } from '@angular/router';

// Auth
import { Login } from './features/auth/login/login';

// Admin Layout
import { AdminLayout } from './features/admin/admin-layout/admin-layout';

// Super Admin
import { SuperDashboard } from './features/admin/super/super-dashboard/super-dashboard';
import { OrganizationComponent } from './features/admin/super/organization/organization';
import { UserAssignmentComponent } from './features/admin/super/user-assignment/user-assignment';

// HR Module
import { HrList } from './features/hr/hr-list/hr-list';
import { LeaveRequestComponent } from './features/hr/leave-request/leave-request';

// Volunteers Module
import { VolunteerHubComponent } from './features/volunteers/volunteer-hub/volunteer-hub';

// ❌ Temporarily comment out future components (not created yet)
// import { VolunteerHourLogComponent } from './features/volunteers/volunteer-hour-log/volunteer-hour-log';
// import { CrmDashboardComponent } from './features/crm/crm-dashboard/crm-dashboard';
// import { RealTimeStatsComponent } from './features/admin/super/real-time-stats/real-time-stats';
// import { ModuleConfigComponent } from './features/admin/super/module-config/module-config';

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

      // HR & Staff
      { path: 'hr', component: HrList },
      { path: 'hr/leave', component: LeaveRequestComponent },

      // Volunteers
      { path: 'volunteers/hub', component: VolunteerHubComponent },

      // ❌ Future features – uncomment when ready
      // { path: 'volunteers/hour-log', component: VolunteerHourLogComponent },
      // { path: 'crm', component: CrmDashboardComponent },
      // { path: 'super/stats', component: RealTimeStatsComponent },
      // { path: 'super/modules', component: ModuleConfigComponent },

      // Default
      { path: '', redirectTo: 'super', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];