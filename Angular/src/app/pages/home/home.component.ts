import { Component } from '@angular/core';
import {LoggedHeaderComponent} from '../../components/logged-header/logged-header.component';

@Component({
  selector: 'app-home',
  imports: [
    LoggedHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
