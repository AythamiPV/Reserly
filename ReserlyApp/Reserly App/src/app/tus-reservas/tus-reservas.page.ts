import { Component, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tus-reservas',
  templateUrl: './tus-reservas.page.html',
  styleUrls: ['./tus-reservas.page.scss'],
  standalone: true,
  imports: [LoggedHeaderComponent, FooterComponent, RouterLink],
})
export class TusReservasPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
