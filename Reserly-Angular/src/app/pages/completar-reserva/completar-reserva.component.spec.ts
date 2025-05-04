import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarReservaComponent } from './completar-reserva.component';

describe('CompletarReservaComponent', () => {
  let component: CompletarReservaComponent;
  let fixture: ComponentFixture<CompletarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletarReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
