import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Services } from '../shared/interfaces/service.interface';
import { SQLiteService } from '../shared/services/sqlite.service';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-mis-favoritos-detalle',
  templateUrl: './mis-favoritos-detalle.page.html',
  styleUrls: ['./mis-favoritos-detalle.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, LoggedHeaderComponent, FooterComponent],
})
export class MisFavoritosDetallePage implements OnInit {
  public servicio: Services | null = null;

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private firebaseService: FirebaseService,
    private sqliteService: SQLiteService
  ) {}

  ngOnInit() {
    const id = this.activated.snapshot.paramMap.get('id');
    if (!id) return this.back();

    this.firebaseService
      .getDocumentData<Services>('servicios', id)
      .subscribe((data) => {
        if (!data) return;
        this.servicio = data;
        this.validateFavorite();
      });
  }

  addFavorite() {
    if (!this.servicio) return;
    this.sqliteService.addFavorite(this.servicio);
    this.servicio.isFavorite = true;
  }

  removeFavorite() {
    if (!this.servicio) return;
    this.sqliteService.removeFavorite(this.servicio.id);
    this.servicio.isFavorite = false;
  }

  back() {
    this.router.navigate(['/mis-favoritos']);
  }

  private async validateFavorite() {
    if (!this.servicio) return;
    const favoritos = await this.sqliteService.getFavorites();
    const isFavorite = favoritos.some((x) => x.id === this.servicio!.id);
    if (isFavorite) this.servicio.isFavorite = true;
  }
}
