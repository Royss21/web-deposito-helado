import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

const AUTH_ROUTES: Route[] = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      // {
      //   path: '',
      //   component: ListInscriptionComponent,
      // },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: '/login' },
    ],
  },
];

export default AUTH_ROUTES;
