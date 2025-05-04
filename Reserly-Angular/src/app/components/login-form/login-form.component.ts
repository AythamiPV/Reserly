import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../firebase.service'; // Importa tu FirebaseService

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  formData = {
    email: '',
    password: ''
  };
  errorMessage = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  onSubmit() {
    this.errorMessage = '';
    this.firebaseService.signInWithEmailAndPassword(this.formData.email, this.formData.password)
      .then(user => {
        console.log('Usuario logueado:', user);
        // Ahora obtenemos los datos adicionales del usuario desde Firestore
        if (user && user.uid) {
          this.firebaseService.getUserData(user.uid).subscribe(userData => {
            if (userData && userData['company']) {
              this.router.navigate(['/company-main']); // Redirige a la página de empresa
            } else {
              this.router.navigate(['/tu-cuenta']); // Redirige a la página de usuario normal
            }
          }, error => {
            console.error('Error al obtener los datos del usuario:', error);
            this.errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo.';
          });
        } else {
          this.errorMessage = 'Error al obtener la información del usuario.';
        }
      })
      .catch(error => {
        this.errorMessage = 'Error al iniciar sesión: ' + error.message;
        console.error('Error al iniciar sesión:', error);
      });
  }
}
