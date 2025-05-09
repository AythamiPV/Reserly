import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../shared/components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [LoginFormComponent],
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
