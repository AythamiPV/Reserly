import { Component, OnInit } from '@angular/core';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import {FirebaseService} from "../shared/services/firebase.service";
import { FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { Auth, deleteUser } from '@angular/fire/auth';
import {Router} from "@angular/router";
import {
  User,
} from 'firebase/auth';

@Component({
  selector: 'app-tu-cuenta',
  templateUrl: './tu-cuenta.page.html',
  styleUrls: ['./tu-cuenta.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, LoggedHeaderComponent, FooterComponent],

})
export class TuCuentaPage implements OnInit {
  userName: string | null = null;
  user: User | null = null;
  editingUser: boolean = false;
  userControl = new FormControl(null, Validators.required);

  constructor(
    private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
     this.firebaseService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
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

  editUser(){
    if (this.userControl.invalid){
      return alert('Escriba un nombre');
    }
      if (this.user) {
        this.firebaseService
          .updateDocument('Users', this.user.uid, { nombreCompleto: this.userControl.value })
          .then(() => {
            alert('Se ha editado el usuario');
            console.log('Nombre actualizado correctamente');
          })
          .catch((error) => {
            console.error('Error al actualizar el nombre:', error);
          });
      }
  }

  deleteUser(){

      if (this.user) {
        this.firebaseService.deleteDocument('Users', this.user.uid)
          .then(() => {
            console.log('Documento eliminado');

            return deleteUser(this.user!);
          })
          .then(() => {
            console.log('Usuario eliminado del autenticador');
            this.router.navigate(['/login']);
            alert('Se ha eliminado la cuenta');
          })
          .catch(error => {
            console.error('Error al eliminar cuenta:', error);
          });
      }

  }
}
