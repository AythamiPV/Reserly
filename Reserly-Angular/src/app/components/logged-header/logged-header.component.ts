import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute

@Component({
  selector: 'app-logged-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  isInCompanyMain: boolean = false;
  private routerSubscription: any;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkIfInCompanyMain(event.url);
        this.cdr.detectChanges();
      }
    });

    // Comprobación inicial al cargar el componente
    this.checkIfInCompanyMain(this.router.url);
  }

  ngAfterViewInit(): void {
    this.initDropdown();
  }

  ngOnDestroy(): void {
    this.removeDropdownListeners();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private checkIfInCompanyMain(url: string): void {
    this.isInCompanyMain = url === '/company-main';
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
      this.documentClickListener(new MouseEvent(''));
      this.documentClickListener = null;
    }
  }

  navigateTo(path: string) {
    if (path === '/index') {
      console.log('Cerrando sesión...');
      this.router.navigate([path]);
    } else {
      this.router.navigate([path]);
      console.log(`Navegando a: ${path}`);
    }
  }
}
