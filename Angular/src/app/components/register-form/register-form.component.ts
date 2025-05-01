import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  selectedFlag = '../Pictures/us.png'; // Asegúrate de que la ruta sea correcta
  selectedCode = '+1';
  countries: Country[] = [
    { code: '+1', name: 'USA', flag: '../Pictures/us.png' }, // Ajusta las rutas de las banderas si es necesario
    { code: '+44', name: 'UK', flag: '../Pictures/uk.png' },
    { code: '+34', name: 'Spain', flag: '../Pictures/es.png' },
    { code: '+33', name: 'France', flag: '../Pictures/fr.png' },
    { code: '+49', name: 'Germany', flag: '../Pictures/de.png' },
    { code: '+52', name: 'Mexico', flag: '../Pictures/mx.png' },
    { code: '+55', name: 'Brazil', flag: '../Pictures/br.png' }
  ];

  @ViewChild('signupForm') signupForm: NgForm;

  constructor(private firebaseService: FirebaseService) { }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.openErrorModal();
      return;
    }

    const userData = { ...this.formData, phoneCode: this.selectedCode };

    this.firebaseService.createUser(userData)
      .then(() => {
        this.successMessage = 'Usuario registrado con éxito.';
        this.openSuccessModal();
        if (this.signupForm) {
          this.signupForm.resetForm();
        }
      })
      .catch((error) => {
        this.errorMessage = 'Error al registrar el usuario: ' + error;
        this.openErrorModal();
        console.error('Error al registrar usuario:', error);
      });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCountry(country: Country) {
    this.selectedFlag = country.flag;
    this.selectedCode = country.code;
    this.isDropdownOpen = false;
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
