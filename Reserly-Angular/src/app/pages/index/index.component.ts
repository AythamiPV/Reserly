import { Component} from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/main-header/main-header.component';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
// import { Firestore, collection, collectionData } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent{
  constructor( private router: Router) {
  }
}
