import { Routes } from '@angular/router';
import { ResidentsListPage } from './pages/residents-list-page/residents-list-page';
import { AdminLayout } from './admin-layout/admin-layout';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: 'resident-list',
        component: ResidentsListPage,
      },
      {
        path: '**',
        redirectTo: 'resident-list',
      },
    ],
  },
];
