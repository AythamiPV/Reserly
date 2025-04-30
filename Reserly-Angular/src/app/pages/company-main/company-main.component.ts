import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedHeaderComponent } from '../../components/logged-header/logged-header.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ListComponent } from '../../components/list/list.component';
import { FooterComponent } from '../../components/footer/footer.component'; // Importa FooterComponent

interface Reservation {
  userName: string;
  service: string;
  time: string;
}

@Component({
  selector: 'app-company-main',
  standalone: true,
  imports: [CommonModule, LoggedHeaderComponent, CalendarComponent, ListComponent, FooterComponent], // Añade FooterComponent
  templateUrl: './company-main.component.html',
  styleUrls: ['./company-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyMainComponent implements OnInit, OnDestroy {
  reservationsData: Reservation[] = [
    { userName: 'User name 1', service: 'Book a 2pm haircut', time: '2pm' },
    { userName: 'User name 2', service: 'Book a 2:30 pm haircut', time: '2:30 pm' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
