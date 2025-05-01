import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../firebase.service';
import { CommonModule } from '@angular/common';

interface Country {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  formData = {
    nombreCompleto: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: ''
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

  constructor(private firebaseService: FirebaseService, private cdr: ChangeDetectorRef, private appRef: ApplicationRef) { }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';


    if(this.formData.nombreCompleto === '' || this.formData.email === '' || this.formData.password === '' || this.formData.confirmPassword === '' || this.formData.telefono === '' ) {
      this.errorMessage = 'Todos los campos deben estár completos';
      this.openErrorModal();
      this.cdr.detectChanges();
      return;
    }

    if(this.formData.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener un mínimo de 6 caracteres!';
      this.openErrorModal();
      this.cdr.detectChanges();
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.openErrorModal(); // También mostramos el modal
      this.cdr.detectChanges(); // Forzar la detección de cambios
      return;
    }

    const userData = { ...this.formData, phoneCode: this.selectedCode };

    this.firebaseService.createUser(userData)
      .then(() => {
        this.successMessage = 'Usuario registrado con éxito.';
        this.openSuccessModal(); // También mostramos el modal
        this.formData = { nombreCompleto: '', email: '', password: '', confirmPassword: '', telefono: '' };
        this.cdr.detectChanges(); // Forzar la detección de cambios
      })
      .catch((error) => {
        this.errorMessage = 'Error al registrar el usuario: ' + error;
        this.openErrorModal(); // También mostramos el modal
        console.error('Error al registrar usuario:', error);
        this.cdr.detectChanges(); // Forzar la detección de cambios
      });
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
    console.log('isDropdownOpen después de selección:', this.isDropdownOpen)
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
