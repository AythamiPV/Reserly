// src/app/app-routing.module.ts
import { Routes } from '@angular/router';
import { CompanyMainComponent } from './pages/company-main/company-main.component';
import { ManageCompanyComponent } from './pages/manage-company/manage-company.component';
import { IndexComponent } from './pages/index/index.component'; // Importa IndexComponent

export const routes: Routes = [
  { path: 'company-main', component: CompanyMainComponent },
  { path: 'manage-company', component: ManageCompanyComponent },
  { path: 'index', component: IndexComponent }, // Ruta para el IndexComponent
  { path: '', redirectTo: '/index', pathMatch: 'full' }, // Redirige la ruta vacía a /index
];
