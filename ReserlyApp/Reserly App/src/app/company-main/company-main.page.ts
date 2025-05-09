import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ListComponent } from '../shared/components/list/list.component';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../shared/services/firebase.service';
import { Reservation } from '../shared/interfaces/reservation.interface';

@Component({
  selector: 'app-company-main',
  templateUrl: './company-main.page.html',
  styleUrls: ['./company-main.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LoggedHeaderComponent,
    CalendarComponent,
    ListComponent,
    FooterComponent,
  ],
})
export class CompanyMainPage implements OnInit, OnDestroy {
  reservationsData: Reservation[] = [
    { userName: 'User name 1', service: 'Book a 2pm haircut', time: '2pm' },
    {
      userName: 'User name 2',
      service: 'Book a 2:30 pm haircut',
      time: '2:30 pm',
    },
  ];

  companyName: string | null = null; // Propiedad para el nombre de la compañía
  private authSubscription: Subscription | null = null;

  constructor(
    private firebaseService: FirebaseService,
    private cdr: ChangeDetectorRef
  ) {} // Inyecta FirebaseService y ChangeDetectorRef

  ngOnInit(): void {
    this.authSubscription = this.firebaseService.user$.subscribe((user) => {
      if (user) {
        this.firebaseService
          .getDocumentData<{ nombreCompleto: string }>('Users', user.uid)
          .subscribe((userData) => {
            if (userData && userData.nombreCompleto) {
              this.companyName = userData.nombreCompleto;
              this.cdr.detectChanges();
            } else {
              this.companyName = 'Nombre de la Compañía'; // Valor por defecto si no se encuentra
              this.cdr.detectChanges();
              console.log(
                'No se encontró el nombre de la compañía en Firestore.'
              );
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
