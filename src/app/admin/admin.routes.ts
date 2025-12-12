import { Routes } from '@angular/router';
import { ResidentsListPage } from './pages/residents-list-page/residents-list-page';
import { AdminLayout } from './admin-layout/admin-layout';
import { ResidentFormPage } from './pages/resident-form-page/resident-form-page';
import { RufflePage } from './pages/ruffle-page/ruffle-page';

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
        path: 'resident-create',
        component: ResidentFormPage,
      },
      {
        path: 'resident-edit/:id',
        component: ResidentFormPage,
      },
      {
        path: 'raffle',
        component: RufflePage,
      },
      {
        path: '**',
        redirectTo: 'resident-list',
      },
    ],
  },
];
