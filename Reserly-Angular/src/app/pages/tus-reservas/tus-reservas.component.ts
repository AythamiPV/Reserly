import { Component } from '@angular/core';
import {LoggedHeaderComponent} from '../../components/logged-header/logged-header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tus-reservas',
  imports: [
    LoggedHeaderComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './tus-reservas.component.html',
  styleUrl: './tus-reservas.component.css'
})
export class TusReservasComponent {

}
