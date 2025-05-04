import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedHeaderComponent } from '../../components/logged-header/logged-header.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ListComponent } from '../../components/list/list.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ScheduleComponent } from '../../components/schedule/schedule.component';
import { ServiceComponent } from '../../components/service/service.component';

@Component({
  selector: 'app-manage-company',
  standalone: true,
  imports: [CommonModule, LoggedHeaderComponent, CalendarComponent, ListComponent, FooterComponent, ScheduleComponent, ServiceComponent],
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageCompanyComponent implements OnInit, OnDestroy {
  @ViewChild('editableText') editableTextRef!: ElementRef;
  @ViewChild('companyName', { static: false }) companyNameRef!: ElementRef; // Referencia al span del nombre de la compañía

  aboutYouText: string = 'Click the pencil to edit this text.';
  companyName: string = 'Company Name';
  isCompanyNameEditing: boolean = false;
  private blurListener: (() => void) | null = null;
  private companyNameBlurListener: (() => void) | null = null;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    console.log("✅ ManageCompanyComponent ngOnInit ejecutado");
    // Aquí iría la lógica para cargar los datos de la compañía para la edición
    // y para inicializar los datos de las listas (ScheduleList, ServiceList)
  }

  ngOnDestroy(): void {
    console.log("❌ ManageCompanyComponent ngOnDestroy ejecutado");
    this.removeBlurListener();
    this.removeCompanyNameBlurListener();
  }

  enableEditing() {
    if (this.editableTextRef) {
      const element = this.editableTextRef.nativeElement;
      this.renderer.setAttribute(element, 'contenteditable', 'true');
      element.focus();
      this.blurListener = this.renderer.listen(element, 'blur', () => {
        this.renderer.setAttribute(element, 'contenteditable', 'false');
        this.removeBlurListener();
        console.log('Texto "About you" editado:', element.innerText);
        this.aboutYouText = element.innerText;
      });
    }
  }

  removeBlurListener() {
    if (this.blurListener) {
      this.blurListener();
      this.blurListener = null;
    }
  }

  enableCompanyNameEditing() {
    this.isCompanyNameEditing = true;
    if (this.companyNameRef) {
      this.companyNameRef.nativeElement.focus();
      this.companyNameBlurListener = this.renderer.listen(this.companyNameRef.nativeElement, 'blur', () => {
        this.isCompanyNameEditing = false;
        this.removeCompanyNameBlurListener();
        console.log('Nombre de la compañía editado:', this.companyNameRef.nativeElement.innerText);
        this.companyName = this.companyNameRef.nativeElement.innerText;
      });
    }
  }

  removeCompanyNameBlurListener() {
    if (this.companyNameBlurListener) {
      this.companyNameBlurListener();
      this.companyNameBlurListener = null;
    }
  }

  saveChanges() {
    // Lógica para guardar todos los cambios realizados en la página
    console.log('Guardando cambios...');
  }
}
