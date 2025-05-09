import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ListComponent } from '../shared/components/list/list.component';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';
import { ScheduleComponent } from '../shared/components/schedule/schedule.component';
import { ServiceComponent } from '../shared/components/service/service.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.page.html',
  styleUrls: ['./manage-company.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LoggedHeaderComponent,
    CalendarComponent,
    ListComponent,
    FooterComponent,
    ScheduleComponent,
    ServiceComponent,
  ],
})
export class ManageCompanyPage implements OnInit {
  @ViewChild('editableText') editableTextRef!: ElementRef;
  @ViewChild('companyName', { static: false }) companyNameRef!: ElementRef; // Referencia al span del nombre de la compañía

  aboutYouText: string = 'Click the pencil to edit this text.';
  companyName: string = 'Company Name';
  isCompanyNameEditing: boolean = false;
  private blurListener: (() => void) | null = null;
  private companyNameBlurListener: (() => void) | null = null;
  private authSubscription: Subscription | null = null; // Subscription para el estado de auth

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private firebaseService: FirebaseService, // Inyecta FirebaseService
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('✅ ManageCompanyComponent ngOnInit ejecutado');
    this.authSubscription = this.firebaseService.user$.subscribe((user) => {
      if (user) {
        this.firebaseService
          .getDocumentData<{ nombreCompleto: string }>('Users', user.uid)
          .subscribe((userData) => {
            if (userData && userData.nombreCompleto) {
              this.companyName = userData.nombreCompleto;
              this.cdr.detectChanges();
            } else {
              this.companyName = 'Company Name'; // Valor por defecto
              this.cdr.detectChanges();
              console.log(
                'No se encontró el nombre de la compañía en Firestore.'
              );
            }
          });
      } else {
        this.companyName = 'Company Name'; // Valor por defecto si no hay usuario
        this.cdr.detectChanges();
      }
    });
    // Aquí iría la lógica para cargar los datos de la compañía para la edición
    // y para inicializar los datos de las listas (ScheduleList, ServiceList)
  }

  ngOnDestroy(): void {
    console.log('❌ ManageCompanyComponent ngOnDestroy ejecutado');
    this.removeBlurListener();
    this.removeCompanyNameBlurListener();
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
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
      this.companyNameBlurListener = this.renderer.listen(
        this.companyNameRef.nativeElement,
        'blur',
        () => {
          this.isCompanyNameEditing = false;
          this.removeCompanyNameBlurListener();
          console.log(
            'Nombre de la compañía editado:',
            this.companyNameRef.nativeElement.innerText
          );
          this.companyName = this.companyNameRef.nativeElement.innerText;
        }
      );
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
    // Aquí podrías guardar el valor de this.companyName en Firestore
    this.router.navigate(['/company-main']);
  }
}
