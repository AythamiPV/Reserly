import { Component } from '@angular/core';
import {RegisterFormUserComponent} from '../../components/register-form-user/register-form-user.component';

@Component({
  selector: 'app-register-user',
  imports: [
      RegisterFormUserComponent
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

}
