import { Component, OnInit } from '@angular/core';
import { RegisterFormUserComponent } from '../shared/components/register-form-user/register-form-user.component';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
  standalone: true,
  imports: [RegisterFormUserComponent],
})
export class RegisterUserPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
