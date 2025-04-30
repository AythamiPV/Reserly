import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa el Router si vas a manejar las rutas

@Component({
  selector: 'app-logged-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initDropdown();
    this.removeManageCompanyLink();
  }

  ngOnDestroy(): void {
    this.removeDropdownListeners(); // Limpiar listeners para evitar fugas de memoria
  }

  private dropdownClickListener: (() => void) | null = null;
  private documentClickListener: ((event: MouseEvent) => void) | null = null;

  initDropdown() {
    const profilePic = this.el.nativeElement.querySelector(".profile-pic");
    const dropdown = this.el.nativeElement.querySelector(".dropdown");

    if (profilePic && dropdown) {
      this.dropdownClickListener = this.renderer.listen(profilePic, 'click', (event) => {
        event.stopPropagation();
        this.renderer.addClass(dropdown, 'active');
      });

      this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
        if (dropdown && !dropdown.contains(event.target)) {
          this.renderer.removeClass(dropdown, 'active');
        }
      });
    }
  }

  removeDropdownListeners() {
    if (this.dropdownClickListener) {
      this.dropdownClickListener();
      this.dropdownClickListener = null;
    }
    if (this.documentClickListener) {
      this.documentClickListener(new MouseEvent('')); // No necesitamos el evento aquí para remover el listener
      this.documentClickListener = null;
    }
  }

  removeManageCompanyLink() {
    // Angular ya tiene mecanismos de enrutamiento, lo ideal sería manejar esto con rutas.
    // Sin embargo, para replicar la funcionalidad, lo haremos así:
    setTimeout(() => {
      const currentPage = window.location.pathname.split("/").pop();
      console.log("Página actual:", currentPage);
      if (currentPage !== "CompanyMain.html") {
        const manageLink = this.el.nativeElement.querySelector(".dropdown-menu a[href*='ManageCompany.html']");
        if (manageLink) {
          this.renderer.removeChild(this.el.nativeElement.querySelector(".dropdown-menu"), manageLink);
        }
      }
    }, 500);
  }

  // Manejar los clicks de los enlaces del dropdown usando el Router de Angular (opcional pero recomendado)
  navigateTo(path: string) {
    // Aquí podrías implementar lógica adicional antes de navegar si es necesario
    if (path === '../HTML/index.html') {
      // Lógica para cerrar sesión (llamar a tu servicio de Firebase)
      console.log('Cerrando sesión...');
      // this.firebaseService.logoutUser().then(() => this.router.navigate(['/']));
    } else {
      // this.router.navigate([path]); // Asegúrate de configurar las rutas en tu aplicación
      console.log(`Navegando a: ${path}`);
      // Para simular la navegación sin rutas configuradas:
      window.location.href = path;
    }
  }
}
