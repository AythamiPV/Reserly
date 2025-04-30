// src/app/app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { AsyncPipe, CommonModule } from '@angular/common'; // Importa CommonModule si lo usas
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';
import { CompanyMainComponent } from './pages/company-main/company-main.component'; // Importa CompanyMainComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CompanyMainComponent], // Añade CompanyMainComponent a los imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  user$: any;
  private userSubscription: Subscription | undefined;
  private firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
    this.user$ = this.firebaseService.user$;
  }

  ngOnInit(): void {
    this.userSubscription = this.user$.subscribe((user: User | null) => {
      console.log('Estado del usuario en AppComponent:', user);
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    this.firebaseService.logoutUser()
      .then(() => console.log('Sesión cerrada'))
      .catch(error => console.error('Error al cerrar sesión:', error));
  }

  login() {
    this.firebaseService.loginUser('test@example.com', 'password123')
      .then((user) => console.log('Usuario logueado:', user))
      .catch(error => console.error('Error al iniciar sesión:', error));
  }

  register() {
    this.firebaseService.registerUser('test@example.com', 'password123')
      .then((user) => console.log('Usuario registrado:', user))
      .catch(error => console.error('Error al registrar:', error));
  }
}
