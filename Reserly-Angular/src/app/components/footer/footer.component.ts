import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit, OnDestroy {
  constructor() { }

  ngOnInit(): void {
    console.log("✅ FooterComponent ngOnInit ejecutado");
  }

  ngOnDestroy(): void {
    console.log("❌ FooterComponent ngOnDestroy ejecutado");
  }
}
