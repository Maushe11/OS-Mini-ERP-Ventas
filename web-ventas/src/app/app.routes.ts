import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home';
import {LoginComponent} from './pages/login/login';
import {Customer} from './pages/customer/customer';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'customer',
    component: Customer,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
