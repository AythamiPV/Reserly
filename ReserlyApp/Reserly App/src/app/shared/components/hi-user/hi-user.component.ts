import { Component } from '@angular/core';

@Component({
  selector: 'app-hi-user',
  templateUrl: './hi-user.component.html',
  styleUrls: ['./hi-user.component.scss'],
})
export class HiUserComponent {
  userName = 'Your Account';
  fullName = 'your full name here';
}
