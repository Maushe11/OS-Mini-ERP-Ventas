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
import {CustomerWrapper} from './pages/customer/customer-wrapper/customer-wrapper';
import {ProductWrapper} from './pages/product/product-wrapper/product-wrapper';
import {UserWrapper} from './pages/user/user-wrapper/user-wrapper';
import { SalesOrderList } from './pages/sales-order/sales-order-list/sales-order-list';
import { SalesOrderForm } from './pages/sales-order/sales-order-form/sales-order-form';
import { SalesOrderView } from './pages/sales-order/sales-order-view/sales-order-view';

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
    data: {breadcrumb: 'Home'},
    title: 'Home',
    canActivate: [authGuard],
  },
  // User
  {
    path: 'user',
    component: UserWrapper,
    data: {breadcrumb: 'Usuarios'},
    canActivate: [authGuard, roleGuard('ROLE_ADMIN')],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: UserList,
        title: 'Listado de Usuarios',
        data: {breadcrumb: 'Listado'},
        canActivate: [authGuard, roleGuard('ROLE_ADMIN')],
      },
      {
        path: 'create',
        component: UserForm,
        title: 'Registrar usuario',
        data: {breadcrumb: 'Registrar'},
        canActivate: [authGuard, roleGuard('ROLE_ADMIN')],
      },
      {
        path: 'edit/:id',
        component: UserForm,
        title: 'Editar usuario',
        data: {breadcrumb: 'Editar'},
        canActivate: [authGuard, roleGuard('ROLE_ADMIN')],
      }
    ]
  },
  // Customer
  {
    path: 'customer',
    component: CustomerWrapper,
    data: {breadcrumb: 'Clientes'},
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CustomerList,
        title: 'Listado de Clientes',
        data: {breadcrumb: 'Listado'},
        canActivate: [authGuard],
      },
      {
        path: 'create',
        component: CustomerForm,
        title: 'Registrar cliente',
        data: {breadcrumb: 'Registrar'},
        canActivate: [authGuard],
      },
      {
        path: 'edit/:id',
        component: CustomerForm,
        title: 'Editar cliente',
        data: {breadcrumb: 'Editar'},
        canActivate: [authGuard],
      }
    ]
  },
  // Product
  {
    path: 'product',
    component: ProductWrapper,
    data: {breadcrumb: 'Productos'},
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ProductList,
        title: 'Listado de Productos',
        data: {breadcrumb: 'Listado'},
        canActivate: [authGuard],
      },
      {
        path: 'create',
        component: ProductForm,
        title: 'Registrar producto',
        data: {breadcrumb: 'Registrar'},
        canActivate: [authGuard],
      },
      {
        path: 'edit/:id',
        component: ProductForm,
        title: 'Editar producto',
        data: {breadcrumb: 'Editar'},
        canActivate: [authGuard],
      }
    ]
  },
  {
    path: 'sales-order',
    component: SalesOrderWrapper,
    data: {breadcrumb: 'Órdenes'},
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: SalesOrderList,
        title: 'Listado de Órdenes de Venta',
        data: {breadcrumb: 'Listado'},
        canActivate: [authGuard],
      },
      {
        path: 'create',
        component: SalesOrderForm,
        title: 'Registrar órden de venta',
        data: {breadcrumb: 'Registrar'},
        canActivate: [authGuard],
      },
      {
        path: 'view/:id',
        component: SalesOrderView,
        title: 'Ver órden de venta',
        data: {breadcrumb: 'Ver'},
        canActivate: [authGuard],
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
