import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ListComponent } from '../shared/components/list/list.component';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';

@Component({
  selector: 'app-company-website',
  templateUrl: './company-website.page.html',
  styleUrls: ['./company-website.page.scss'],
  standalone: true,
  imports: [LoggedHeaderComponent, ListComponent, FooterComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyWebsitePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
