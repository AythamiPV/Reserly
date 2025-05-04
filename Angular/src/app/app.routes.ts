import { Routes } from '@angular/router';
import { TuCuentaComponent } from './pages/tu-cuenta/tu-cuenta.component';
import { CompletarReservaComponent } from './pages/completar-reserva/completar-reserva.component'; // ruta corregida

export const routes: Routes = [
  { path: '', redirectTo: 'tu-cuenta', pathMatch: 'full' },
  { path: 'tu-cuenta', component: TuCuentaComponent },
  { path: 'completar-reserva', component: CompletarReservaComponent }
];
