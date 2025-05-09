import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { MainHeaderComponent } from '../shared/components/main-header/main-header.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent, MainHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToCompanyMain() {
    this.router.navigate(['/company-main']);
  }
}
