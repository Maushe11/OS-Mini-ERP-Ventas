import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home';
import {LoginComponent} from './pages/login/login';
import {ProductList} from './pages/product/product-list/product-list';
import {ProductForm} from './pages/product/product-form/product-form';
import {authGuard} from './auth/auth.guard';
import {roleGuard} from './auth/role.guard';
import {CustomerList} from './pages/customer/customer-list/customer-list';
import {CustomerForm} from './pages/customer/customer-form/customer-form';
import {UserList} from './pages/user/user-list/user-list';
import {UserForm} from './pages/user/user-form/user-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Ingreso al sistema',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    canActivate: [authGuard],
  },
  // User
  {
    path: 'user',
    component: UserList,
    title: 'Listado de Usuarios',
    canActivate: [authGuard, roleGuard('ROLE_ADMIN')],
  },
  {
    path: 'user/create',
    component: UserForm,
    title: 'Registrar usuario',
    canActivate: [authGuard, roleGuard('ROLE_ADMIN')],
  },
  {
    path: 'user/edit/:id',
    component: UserForm,
    title: 'Editar usuario',
    canActivate: [authGuard, roleGuard('ROLE_ADMIN')],
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
