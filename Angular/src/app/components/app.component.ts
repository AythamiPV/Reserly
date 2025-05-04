import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedHeaderComponent } from './components/logged-header/logged-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LoggedHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
