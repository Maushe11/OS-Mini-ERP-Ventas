import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home';
import {LoginComponent} from './pages/login/login';
import {Customer} from './pages/customer/customer';
import {ProductList} from './pages/product/product-list/product-list';
import {ProductForm} from './pages/product/product-form/product-form';

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
  // Product
  {
    path: 'product',
    component: ProductList,
    title: 'Listado de Productos',
  },
  {
    path: 'product/create',
    component: ProductForm,
    title: 'Registrar producto',
  },
  {
    path: 'product/edit/:id',
    component: ProductForm,
    title: 'Editar producto',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
