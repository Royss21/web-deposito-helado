import { Route } from '@angular/router';

const MAIN_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'orders',
    loadComponent: () => import('./order/order.component'),
  },
  {
    path: 'sales',
    loadComponent: () => import('./sales/sales.component'),
  },
  { path: '**', redirectTo: '' },
];

export default MAIN_ROUTES;
