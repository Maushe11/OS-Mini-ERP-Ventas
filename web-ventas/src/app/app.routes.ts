import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home';
import {LoginComponent} from './pages/login/login';
import {ProductList} from './pages/product/product-list/product-list';
import {ProductForm} from './pages/product/product-form/product-form';
import {authGuard} from './auth/auth.guard';
import {CustomerList} from './pages/customer/customer-list/customer-list';
import {CustomerForm} from './pages/customer/customer-form/customer-form';

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
    title: 'Inicio',
    canActivate: [authGuard],
  },
  // Customer
  {
    path: 'customer',
    component: CustomerList,
    title: 'Listado de Clientes',
    canActivate: [authGuard],
  },
  {
    path: 'customer/create',
    component: CustomerForm,
    title: 'Registrar cliente',
    canActivate: [authGuard],
  },
  {
    path: 'customer/edit/:id',
    component: CustomerForm,
    title: 'Editar cliente',
    canActivate: [authGuard],
  },
  // Product
  {
    path: 'product',
    component: ProductList,
    title: 'Listado de Productos',
    canActivate: [authGuard],
  },
  {
    path: 'product/create',
    component: ProductForm,
    title: 'Registrar producto',
    canActivate: [authGuard],
  },
  {
    path: 'product/edit/:id',
    component: ProductForm,
    title: 'Editar producto',
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
