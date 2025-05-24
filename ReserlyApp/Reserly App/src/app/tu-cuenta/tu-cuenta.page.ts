import { Component, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import {FirebaseService} from "../shared/services/firebase.service";

@Component({
  selector: 'app-tu-cuenta',
  templateUrl: './tu-cuenta.page.html',
  styleUrls: ['./tu-cuenta.page.scss'],
  standalone: true,
  imports: [LoggedHeaderComponent, FooterComponent],

})
export class TuCuentaPage implements OnInit {
  userName: string | null = null;
  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
     this.firebaseService.user$.subscribe((user) => {
      if (user) {
        this.firebaseService
          .getDocumentData<{ nombreCompleto: string }>('Users', user.uid)
          .subscribe((userData) => {
            console.log(userData);
            if (userData && userData.nombreCompleto) {
              this.userName = userData.nombreCompleto;
            }
          });
      }
    });
  }
}
