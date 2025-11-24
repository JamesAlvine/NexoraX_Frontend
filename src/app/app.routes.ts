import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { SuperDashboard } from './features/admin/super/super-dashboard/super-dashboard';
import { UserList } from './features/admin/super/user-management/user-list'; // ✅ Must match export
import { AddUser } from './features/admin/super/user-management/add-user/add-user';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'super', component: SuperDashboard },
      { path: 'super/users', component: UserList },
      { path: 'super/users/new', component: AddUser },
      { path: '', redirectTo: 'super', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];