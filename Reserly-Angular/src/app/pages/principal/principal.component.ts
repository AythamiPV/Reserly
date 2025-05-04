import { Component } from '@angular/core';
import {FooterComponent} from '../../components/footer/footer.component';
import {HeaderComponent} from '../../components/main-header/main-header.component';
import {MainContentComponent} from '../../components/main-content/main-content.component';

@Component({
  selector: 'app-principal',
  imports: [
    FooterComponent,
    HeaderComponent,
    MainContentComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
