// #4: Application Routes (TypeScript)
// Purpose: Define all routes for the NGO platform
// Structure: Login → Admin Layout (with sub-routes)
// Features: Role-based paths (Super Admin, HR, Volunteers)

import { Routes } from '@angular/router';

// Auth
import { Login } from './features/auth/login/login';

// Admin Layout (shell for all admin pages)
import { AdminLayout } from './features/admin/admin-layout/admin-layout';

// Super Admin
import { SuperDashboard } from './features/admin/super/super-dashboard/super-dashboard';
import { OrganizationComponent } from './features/admin/super/organization/organization';
import { UserAssignmentComponent } from './features/admin/super/user-assignment/user-assignment';

// HR Module
import { HrList } from './features/hr/hr-list/hr-list';

// Volunteers Module
import { VolunteerHubComponent } from './features/volunteers/volunteer-hub/volunteer-hub';

export const routes: Routes = [
  // Public routes
  { path: 'login', component: Login },

  // Admin routes (protected)
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      // Super Admin
      { path: 'super', component: SuperDashboard },
      { path: 'super/organization', component: OrganizationComponent },
      { path: 'super/users', component: UserAssignmentComponent },

      // HR
      { path: 'hr', component: HrList },

      // Volunteers
      { path: 'volunteers/hub', component: VolunteerHubComponent },

      // Default redirect
      { path: '', redirectTo: 'super', pathMatch: 'full' }
    ]
  },

  // Default route
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Wildcard (404 fallback)
  { path: '**', redirectTo: '/login' }
];