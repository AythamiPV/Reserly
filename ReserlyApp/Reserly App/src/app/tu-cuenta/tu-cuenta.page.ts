import { Component, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-tu-cuenta',
  templateUrl: './tu-cuenta.page.html',
  styleUrls: ['./tu-cuenta.page.scss'],
  standalone: true,
  imports: [LoggedHeaderComponent, FooterComponent],
})
export class TuCuentaPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
