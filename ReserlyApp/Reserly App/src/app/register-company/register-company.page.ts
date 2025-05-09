import { Component, OnInit } from '@angular/core';
import { RegisterFormCompanyComponent } from '../shared/components/register-form-company/register-form-company.component';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
  standalone: true,
  imports: [RegisterFormCompanyComponent],
})
export class RegisterCompanyPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
