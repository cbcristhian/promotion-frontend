import { Routes } from '@angular/router';
import { ResidentLayout } from './resident-layout/resident-layout';
import { ResidentHistoryPage } from './pages/resident-history-page/resident-history-page';

export const residentRoutes: Routes = [
  {
    path: '',
    component: ResidentLayout,
    children: [
      {
        path: 'history',
        component: ResidentHistoryPage,
      },
      {
        path: '**',
        redirectTo: 'history',
      },
    ],
  },
];
