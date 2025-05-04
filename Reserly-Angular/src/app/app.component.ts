import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Importa RouterOutlet en lugar de CompanyMainComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  user$: any;
  private userSubscription: Subscription | undefined;
  private firebaseService: FirebaseService;
  private router: any;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

}
