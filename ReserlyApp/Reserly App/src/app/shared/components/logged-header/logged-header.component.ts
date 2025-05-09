import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logged-header',
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.scss'],
  imports: [CommonModule],
})
export class LoggedHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  isInCompanyMain: boolean = false;
  isTuCuentaMain: boolean = false;
  isTusReservasMain: boolean = false;
  userName: string | null = null;
  private routerSubscription: Subscription | null = null;
  private authSubscription: Subscription | null = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkIfTuCuenta(event.url);
        this.checkIfInCompanyMain(event.url);
        this.checkIfTusReservas(event.url);
        this.cdr.detectChanges();
      }
    });

    // Comprobación inicial al cargar el componente
    this.checkIfInCompanyMain(this.router.url);
    this.checkIfTuCuenta(this.router.url);
    this.checkIfTusReservas(this.router.url);

    // Escucha los cambios en el usuario autenticado y carga el nombre
    this.authSubscription = this.firebaseService.user$.subscribe((user) => {
      if (user) {
        this.firebaseService
          .getDocumentData<{ nombreCompleto: string }>('Users', user.uid)
          .subscribe((userData) => {
            console.log(userData);
            if (userData && userData.nombreCompleto) {
              this.userName = userData.nombreCompleto;
              this.cdr.detectChanges();
            } else {
              this.userName = 'Usuario';
              this.cdr.detectChanges();
              console.log('No se encontró el nombre del usuario en Firestore.');
            }
          });
      } else {
        this.userName = null;
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initDropdown();
  }

  ngOnDestroy(): void {
    this.removeDropdownListeners();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private checkIfInCompanyMain(url: string): void {
    this.isInCompanyMain = url === '/company-main';
  }

  private checkIfTuCuenta(url: string): void {
    this.isTuCuentaMain = url === '/tu-cuenta';
  }

  private checkIfTusReservas(url: string): void {
    this.isTusReservasMain = url === '/tus-reservas';
  }

  private dropdownClickListener: (() => void) | null = null;
  private documentClickListener: ((event: MouseEvent) => void) | null = null;

  initDropdown() {
    const profilePic = this.el.nativeElement.querySelector('.profile-pic');
    const dropdown = this.el.nativeElement.querySelector('.dropdown');

    if (profilePic && dropdown) {
      this.dropdownClickListener = this.renderer.listen(
        profilePic,
        'click',
        (event) => {
          event.stopPropagation();
          this.renderer.addClass(dropdown, 'active');
        }
      );

      this.documentClickListener = this.renderer.listen(
        'document',
        'click',
        (event) => {
          if (dropdown && !dropdown.contains(event.target)) {
            this.renderer.removeClass(dropdown, 'active');
          }
        }
      );
    }
  }

  removeDropdownListeners() {
    if (this.dropdownClickListener) {
      this.dropdownClickListener();
      this.dropdownClickListener = null;
    }
    if (this.documentClickListener) {
      this.documentClickListener(new MouseEvent(''));
      this.documentClickListener = null;
    }
  }

  logout() {
    // Nueva función para el logout
    this.firebaseService
      .logoutUser()
      .then(() => {
        console.log('Sesión cerrada.');
        this.router.navigate(['/index']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  navigateTo(path: string) {
    if (path === '/index') {
      console.log('Cerrando sesión...');
      // No necesitamos llamar a logout aquí, la función logout() se encargará
      this.router.navigate([path]);
    } else {
      this.router.navigate([path]);
      console.log(`Navegando a: ${path}`);
    }
  }
}
