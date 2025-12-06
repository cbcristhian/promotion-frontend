import { Routes } from '@angular/router';
import { AuthLayout } from './auth-layout/auth-layout';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
