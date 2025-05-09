import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { CompletarReservaComponent } from './pages/completar-reserva/completar-reserva.component';
import { TuCuentaComponent } from './pages/tu-cuenta/tu-cuenta.component';
import { TusReservasComponent } from './pages/tus-reservas/tus-reservas.component';

export const routes: Routes = [
  { path: 'completar-reserva', component: CompletarReservaComponent },
  { path: 'tu-cuenta', component: TuCuentaComponent },
  { path: 'tus-reservas', component: TusReservasComponent },
  { path: '', redirectTo: 'completar-reserva', pathMatch: 'full' }
];

export const appRouterProviders = [provideRouter(routes)];
