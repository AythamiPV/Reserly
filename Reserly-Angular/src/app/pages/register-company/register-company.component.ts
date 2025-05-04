import { Component } from '@angular/core';
import {RegisterFormCompanyComponent} from '../../components/register-form-company/register-form-company.component';

@Component({
  selector: 'app-register-user',
  imports: [
    RegisterFormCompanyComponent
  ],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent {

}
