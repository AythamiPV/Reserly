import { Component } from '@angular/core';
import {LoggedHeaderComponent} from '../../components/logged-header/logged-header.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-tus-reservas',
  imports: [
    LoggedHeaderComponent,
    FooterComponent
  ],
  templateUrl: './tus-reservas.component.html',
  styleUrl: './tus-reservas.component.css'
})
export class TusReservasComponent {

}
