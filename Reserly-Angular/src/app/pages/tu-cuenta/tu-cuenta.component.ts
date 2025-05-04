import { Component } from '@angular/core';
import {LoggedHeaderComponent} from '../../components/logged-header/logged-header.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-tu-cuenta',
  standalone: true,
  templateUrl: './tu-cuenta.component.html',
  imports: [
    LoggedHeaderComponent,
    FooterComponent
  ],
  styleUrls: ['./tu-cuenta.component.css']
})
export class TuCuentaComponent {}
