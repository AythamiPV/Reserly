import { Component } from '@angular/core';

@Component({
  selector: 'app-logged-header',
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css']
})
export class LoggedHeaderComponent {
  dropdownActive = false;

  toggleDropdown() {
    this.dropdownActive = !this.dropdownActive;
  }

  closeDropdown() {
    this.dropdownActive = false;
  }
}
