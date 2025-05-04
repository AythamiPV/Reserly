import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para el binding de formularios

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceComponent implements OnInit {
  serviceName: string = '';
  cost: number | null = null;
  timeCost: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log('✅ ServiceComponent ngOnInit ejecutado');
  }

  addService() {
    console.log('Añadiendo servicio:', this.serviceName, this.cost, this.timeCost);
    // Aquí iría la lógica para enviar los datos del servicio
  }
}
