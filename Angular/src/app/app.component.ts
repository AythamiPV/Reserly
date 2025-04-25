import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CompanyMainComponent} from './pages/company-main/company-main.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, CompanyMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
}
