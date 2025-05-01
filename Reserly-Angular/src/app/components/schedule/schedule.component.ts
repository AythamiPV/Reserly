import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para el binding de formularios

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit {
  serviceName: string = '';
  cost: number | null = null;
  timeCost: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log('✅ ScheduleComponent ngOnInit ejecutado');
  }

  addService() {
    console.log('Añadiendo servicio (desde ScheduleComponent):', this.serviceName, this.cost, this.timeCost);
    // Aquí iría la lógica para enviar los datos del servicio/horario
  }
}
