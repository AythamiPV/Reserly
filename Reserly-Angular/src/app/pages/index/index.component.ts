import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {FooterComponent} from '../../components/footer/footer.component';
import {LoggedHeaderComponent} from '../../components/logged-header/logged-header.component';
import {HeaderComponent} from '../../components/main-header/main-header.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FooterComponent, LoggedHeaderComponent, HeaderComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('✅ IndexComponent ngOnInit ejecutado');
  }

  navigateToCompanyMain() {
    this.router.navigate(['/company-main']);
  }
}
