import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedHeaderComponent } from '../../components/logged-header/logged-header.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ListComponent } from '../../components/list/list.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FirebaseService } from '../../firebase.service'; // Importa FirebaseService
import { Subscription } from 'rxjs'; // Importa Subscription

interface Reservation {
  userName: string;
  service: string;
  time: string;
}

@Component({
  selector: 'app-company-main',
  standalone: true,
  imports: [CommonModule, LoggedHeaderComponent, CalendarComponent, ListComponent, FooterComponent],
  templateUrl: './company-main.component.html',
  styleUrls: ['./company-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyMainComponent implements OnInit, OnDestroy {
  reservationsData: Reservation[] = [
    { userName: 'User name 1', service: 'Book a 2pm haircut', time: '2pm' },
    { userName: 'User name 2', service: 'Book a 2:30 pm haircut', time: '2:30 pm' }
  ];

  companyName: string | null = null; // Propiedad para el nombre de la compañía
  private authSubscription: Subscription | null = null;

  constructor(private firebaseService: FirebaseService, private cdr: ChangeDetectorRef) { } // Inyecta FirebaseService y ChangeDetectorRef

  ngOnInit(): void {
    this.authSubscription = this.firebaseService.user$.subscribe(user => {
      if (user) {
        this.firebaseService.getDocumentData<{ nombreCompleto: string }>('Users', user.uid).subscribe(userData => {
          if (userData && userData.nombreCompleto) {
            this.companyName = userData.nombreCompleto;
            this.cdr.detectChanges();
          } else {
            this.companyName = 'Nombre de la Compañía'; // Valor por defecto si no se encuentra
            this.cdr.detectChanges();
            console.log('No se encontró el nombre de la compañía en Firestore.');
          }
        });
      } else {
        this.companyName = null;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
