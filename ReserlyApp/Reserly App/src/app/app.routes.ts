import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mis-favoritos',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'company-main',
    loadComponent: () =>
      import('./company-main/company-main.page').then((m) => m.CompanyMainPage),
  },
  {
    path: 'company-website',
    loadComponent: () =>
      import('./company-website/company-website.page').then(
        (m) => m.CompanyWebsitePage
      ),
  },
  {
    path: 'completar-reserva',
    loadComponent: () =>
      import('./completar-reserva/completar-reserva.page').then(
        (m) => m.CompletarReservaPage
      ),
  },
  {
    path: 'index',
    loadComponent: () => import('./index/index.page').then((m) => m.IndexPage),
  },
  {
    path: 'manage-company',
    loadComponent: () =>
      import('./manage-company/manage-company.page').then(
        (m) => m.ManageCompanyPage
      ),
  },
  {
    path: 'register-company',
    loadComponent: () =>
      import('./register-company/register-company.page').then(
        (m) => m.RegisterCompanyPage
      ),
  },
  {
    path: 'register-user',
    loadComponent: () =>
      import('./register-user/register-user.page').then(
        (m) => m.RegisterUserPage
      ),
  },
  {
    path: 'tu-cuenta',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./tu-cuenta/tu-cuenta.page').then((m) => m.TuCuentaPage),
  },
  {
    path: 'tus-reservas',
    loadComponent: () =>
      import('./tus-reservas/tus-reservas.page').then((m) => m.TusReservasPage),
  },
  {
    path: 'mis-favoritos',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./mis-favoritos/mis-favoritos.page').then(
        (m) => m.MisFavoritosPage
      ),
  },
  {
    path: 'mis-favoritos-detalle/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./mis-favoritos-detalle/mis-favoritos-detalle.page').then(
        (m) => m.MisFavoritosDetallePage
      ),
  },
];
