import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SalesComponent } from './features/sales/sales.component';
import { StockComponent } from './features/products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
  { path: 'ventas', component: SalesComponent, title: 'Registro de Ventas' },
  { path: 'products', component: StockComponent, title: 'Gestión de Stock' },
  { path: '**', redirectTo: 'dashboard' } // Ruta comodín
];

