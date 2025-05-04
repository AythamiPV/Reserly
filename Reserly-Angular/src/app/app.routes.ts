// src/app/app-routing.module.ts
import { Routes } from '@angular/router';
import { CompanyMainComponent } from './pages/company-main/company-main.component';
import { ManageCompanyComponent } from './pages/manage-company/manage-company.component';
import { IndexComponent } from './pages/index/index.component'; // Importa IndexComponent
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterCompanyComponent} from './pages/register-company/register-company.component';
import { LoginComponent } from './pages/login/login.component';
import {TuCuentaComponent} from './pages/tu-cuenta/tu-cuenta.component';
import {TusReservasComponent} from './pages/tus-reservas/tus-reservas.component';
import {CompanyWebsiteComponent} from './pages/company-website/company-website.component';
import {CompletarReservaComponent} from './pages/completar-reserva/completar-reserva.component';

export const routes: Routes = [
  { path: 'company-main', component: CompanyMainComponent },
  { path: 'manage-company', component: ManageCompanyComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'register-company', component: RegisterCompanyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tu-cuenta', component: TuCuentaComponent},
  {path: 'tus-reservas', component: TusReservasComponent},
  {path:'completar-reserva', component: CompletarReservaComponent},
  {path:'company-website', component: CompanyWebsiteComponent},
  { path: 'index', component: IndexComponent }, // Ruta para el IndexComponent
  { path: '', redirectTo: '/index', pathMatch: 'full' }, // Redirige la ruta vacía a /index
];
