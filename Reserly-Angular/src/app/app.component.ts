// src/app/app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth'; // Importa el tipo User

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  user$: any; // Podrías tipar esto como Observable<User | null> si lo prefieres
  private userSubscription: Subscription | undefined;
  private firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
    this.user$ = this.firebaseService.user$;
  }

  ngOnInit(): void {
    this.userSubscription = this.user$.subscribe((user: User | null) => { // Especifica el tipo User | null
      console.log('Estado del usuario en AppComponent:', user);
      // Aquí podrías realizar otras acciones basadas en el estado del usuario
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
    // Simulación de inicio de sesión para pruebas rápidas
    this.firebaseService.loginUser('test@example.com', 'password123')
      .then((user) => console.log('Usuario logueado:', user))
      .catch(error => console.error('Error al iniciar sesión:', error));
  }

  register() {
    // Simulación de registro para pruebas rápidas
    this.firebaseService.registerUser('test@example.com', 'password123')
      .then((user) => console.log('Usuario registrado:', user))
      .catch(error => console.error('Error al registrar:', error));
  }
}
