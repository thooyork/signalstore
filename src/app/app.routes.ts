import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'todos',
    loadComponent: () => import('./features/todo/components/todos-list/todos-list').then((m) => m.TodosList),
  },
  {
    path: 'forms',
    loadComponent: () => import('./features/forms/order/order-form').then((m) => m.OrderForm),
  },
  {
    path: '**',
    redirectTo: 'todos',
  },
];
