import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../firebase.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from "@angular/router";

interface Country {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-register-company-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register-form-company.component.html',
  styleUrl: './register-form-company.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormCompanyComponent {
  formData = {
    nombreCompleto: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    company: true
  };
  errorMessage = '';
  successMessage = '';
  isDropdownOpen = false;
  selectedFlag = '/us.png';
  selectedCode = '+1';
  countries: Country[] = [
    { code: '+1', name: 'USA', flag: '/us.png' },
    { code: '+44', name: 'UK', flag: '/uk.png' },
    { code: '+34', name: 'Spain', flag: '/es.png' },
    { code: '+33', name: 'France', flag: '/fr.png' },
    { code: '+49', name: 'Germany', flag: '/de.png' },
    { code: '+52', name: 'Mexico', flag: '/mx.png' },
    { code: '+55', name: 'Brazil', flag: '/br.png' }
  ];

  constructor(private firebaseService: FirebaseService, private cdr: ChangeDetectorRef, private appRef: ApplicationRef, private router: Router) { } // Importa Router

  async onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.formData.nombreCompleto === '' || this.formData.email === '' || this.formData.password === '' || this.formData.confirmPassword === '' || this.formData.telefono === '') {
      this.errorMessage = 'Todos los campos deben estar completos';
      this.openErrorModal();
      this.cdr.detectChanges();
      return;
    }

    if (this.formData.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener un mínimo de 6 caracteres!';
      this.openErrorModal();
      this.cdr.detectChanges();
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.openErrorModal();
      this.cdr.detectChanges();
      return;
    }

    try {
      const user = await this.firebaseService.registerUser(this.formData.email, this.formData.password);
      const userData = {
        nombreCompleto: this.formData.nombreCompleto,
        email: this.formData.email,
        telefono: this.formData.telefono,
        phoneCode: this.selectedCode,
        company: true // Marcamos que este usuario es una compañía
      };
      await this.firebaseService.setDocument('Users', user.uid, userData); // Usamos setDocument con el uid
      this.successMessage = 'Compañía registrada con éxito.';
      this.openSuccessModal();
      this.formData = { nombreCompleto: '', email: '', password: '', confirmPassword: '', telefono: '', company: true };
      this.cdr.detectChanges();
      this.router.navigate(['/login']); // Redirigir a la página de login
    } catch (error: any) {
      this.errorMessage = 'Error al registrar la compañía: ' + error.message;
      this.openErrorModal();
      console.error('Error al registrar compañía:', error);
      this.cdr.detectChanges();
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.cdr.detectChanges();
  }

  selectCountry(country: Country) {
    console.log('Opción seleccionada:', country.name);
    this.selectedFlag = country.flag;
    this.selectedCode = country.code;
    this.isDropdownOpen = false;
    console.log('isDropdownOpen después de selección:', this.isDropdownOpen);
    this.cdr.detectChanges();
    this.appRef.tick();
  }

  openErrorModal() {
    const modal = document.getElementById('errorModal');
    if (modal) {
      modal.classList.add('open');
    }
  }

  closeErrorModal() {
    const modal = document.getElementById('errorModal');
    if (modal) {
      modal.classList.remove('open');
    }
  }

  openSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.add('open');
    }
  }

  closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.remove('open');
    }
  }
}
