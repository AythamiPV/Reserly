import { ChangeDetectionStrategy, Component } from '@angular/core';
import {LoggedHeaderComponent} from '../../components/logged-header/logged-header.component';
import {ListComponent} from '../../components/list/list.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-company-website',
    imports: [
        LoggedHeaderComponent,
        ListComponent,
        FooterComponent,
        RouterLink
    ],
  templateUrl: './company-website.component.html',
  styleUrl: './company-website.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyWebsiteComponent {

}
