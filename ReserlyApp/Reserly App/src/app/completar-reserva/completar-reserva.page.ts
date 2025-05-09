import { Component, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-completar-reserva',
  templateUrl: './completar-reserva.page.html',
  styleUrls: ['./completar-reserva.page.scss'],
  standalone: true,
  imports: [LoggedHeaderComponent, FooterComponent],
})
export class CompletarReservaPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
