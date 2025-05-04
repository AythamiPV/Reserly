import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TuCuentaComponent } from './tu-cuenta.component';

describe('TuCuentaComponent', () => {
  let component: TuCuentaComponent;
  let fixture: ComponentFixture<TuCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuCuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
