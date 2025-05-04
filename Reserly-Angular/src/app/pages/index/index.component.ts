import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/main-header/main-header.component';
import { NgForOf, CommonModule } from "@angular/common";
import { AngularFirestore, CollectionReference } from '@angular/fire/compat/firestore';

interface Review {
  image?: string;
  decripcion: string;
  value: number;
  name: string;
  type: string;
}

@Component({
  selector: 'app-index',
  imports: [
    FooterComponent,
    HeaderComponent,
    NgForOf,
    CommonModule // Asegúrate de importar CommonModule aquí
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit, AfterViewInit {
  reviews: Review[] = [];
  @ViewChild('articleContainer') articleContainer!: ElementRef;
  private reviewsCollection: CollectionReference<Review>; // Referencia a la colección 'resenas'

  constructor(private firestore: AngularFirestore) {
    this.reviewsCollection = this.firestore.collection<Review>('resenas').ref; // Inicializa la referencia
  }

  ngOnInit(): void {
    this.loadReviewsFromFirestore(); // Carga las reseñas desde Firestore
  }

  ngAfterViewInit(): void {
    // Puedes realizar acciones después de que la vista se haya inicializado, si es necesario
  }

  loadReviewsFromFirestore(): void {
    this.firestore.collection<Review>('resenas').valueChanges()
        .subscribe(data => {
          this.reviews = data;
        }, error => {
          console.error('Error cargando las valoraciones desde Firestore:', error);
        });
  }

  generateStars(rating: number): string {
    const fullStars = Math.floor(rating / 2);
    const halfStar = (rating % 2) >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let starsHTML = "";
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="star full">★</span>';
    }
    if (halfStar) {
      starsHTML += '<span class="star"><span class="half">★</span><span class="empty">★</span></span>';
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="star empty">★</span>';
    }
    return starsHTML;
  }

  scrollLeft(): void {
    this.articleContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.articleContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
