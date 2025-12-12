import { Routes } from '@angular/router';
import { adminGuard } from './auth/guards/admin.guard';
import { residentGuard } from './auth/guards/resident.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.adminRoutes),
    canMatch: [adminGuard],
  },
  {
    path: 'resident',
    loadChildren: () =>
      import('./resident/resident.routes').then((m) => m.residentRoutes),
    canMatch: [residentGuard],
  },
];
