import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedHeaderComponent } from '../shared/components/logged-header/logged-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FirebaseService } from '../shared/services/firebase.service';
import { Services } from '../shared/interfaces/service.interface';
import { SQLiteService } from '../shared/services/sqlite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-favoritos',
  templateUrl: './mis-favoritos.page.html',
  styleUrls: ['./mis-favoritos.page.scss'],
  standalone: true,
  imports: [CommonModule, LoggedHeaderComponent, FooterComponent],
})
export class MisFavoritosPage implements OnInit {
  services: Services[] = [];

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private sqliteService: SQLiteService
  ) {}

  ngOnInit() {
    this.firebaseService
      .getCollectionData<Services>('servicios')
      .subscribe((data) => {
        this.services = data;
        this.validateFavorite();
      });
  }

  openService(service: Services) {
    this.router.navigate(['/mis-favoritos-detalle/' + service.id]);
  }

  private async validateFavorite() {
    const favoritos = await this.sqliteService.getFavorites();
    const favoriteIds = new Set(favoritos.map((fav) => fav.id));
    this.services = this.services.map((x) => ({
      ...x,
      isFavorite: favoriteIds.has(x.id),
    }));
  }
}
