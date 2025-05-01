import { Component } from '@angular/core';
import {LoggedHeaderComponent} from '../../components/logged-header/logged-header.component';
import {RegisterFormComponent} from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-home',
  imports: [
    LoggedHeaderComponent,
    RegisterFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
