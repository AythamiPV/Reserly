import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedHeaderComponent } from '../../components/logged-header/logged-header.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ListComponent } from '../../components/list/list.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import {ScheduleComponent} from '../../components/schedule/schedule.component';
import {ServiceComponent} from '../../components/service/service.component';

@Component({
  selector: 'app-manage-company',
  standalone: true,
  imports: [CommonModule, LoggedHeaderComponent, CalendarComponent, ListComponent, FooterComponent, ScheduleComponent, ServiceComponent],
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageCompanyComponent implements OnInit, OnDestroy {
  constructor(private router: Router) { } // Inyecta el Router

  ngOnInit(): void {
    console.log("✅ ManageCompanyComponent ngOnInit ejecutado");
    // Aquí iría la lógica para cargar los datos de la compañía para la edición
    // y para inicializar los datos de las listas (ScheduleList, ServiceList)
  }

  ngOnDestroy(): void {
    console.log("❌ ManageCompanyComponent ngOnDestroy ejecutado");
  }

  saveChanges() {
    // Aquí iría la lógica para guardar los cambios realizados por el usuario
    console.log('Guardando cambios...');

    // Después de guardar los cambios (o si la acción del botón es solo para volver),
    // navega a la página CompanyMain
    this.router.navigate(['/company-main']);
  }
}
