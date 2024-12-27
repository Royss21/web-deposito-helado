import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./core/layout/layout.component'),
        loadChildren: (): Promise<any> => import('./modules/main.routes'),
      },
      {
        path: 'auth',
        loadChildren: (): Promise<any> => import('./auth/auth.routes'),
      },
    ],
  },
];
