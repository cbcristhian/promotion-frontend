import { Routes } from '@angular/router';
import { AuthLayout } from './auth-layout/auth-layout';
import { LoginPage } from './pages/login-page/login-page';
import { NotAuthenticatedGuard } from './guards/not-authenticated-guard-guard';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginPage,
        canMatch: [NotAuthenticatedGuard],
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
