// src/app/app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { AsyncPipe, CommonModule } from '@angular/common'; // Importa CommonModule si lo usas
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Añade CompanyMainComponent a los imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  user$: any;
  private userSubscription: Subscription | undefined;

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
}
