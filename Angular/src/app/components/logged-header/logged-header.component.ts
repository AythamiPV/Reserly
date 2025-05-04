import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 IMPORTACIÓN NECESARIA

@Component({
  selector: 'app-logged-header',
  standalone: true, // si lo estás usando como componente independiente
  imports: [CommonModule], // 👈 AÑADE CommonModule AQUÍ
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css']
})
export class LoggedHeaderComponent {
  dropdownActive = false;
}

dropdownActive = false;

toggleDropdown() {
  this.dropdownActive = !this.dropdownActive;
}
