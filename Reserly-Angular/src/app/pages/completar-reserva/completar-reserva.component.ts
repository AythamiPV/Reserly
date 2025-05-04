import { Component } from '@angular/core';
import {LoggedHeaderComponent} from '../../components/logged-header/logged-header.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-completar-reserva',
  imports: [
    LoggedHeaderComponent,
    FooterComponent
  ],
  templateUrl: './completar-reserva.component.html',
  styleUrl: './completar-reserva.component.css'
})
export class CompletarReservaComponent {

}
