import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormUserComponent } from './register-form-user.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormUserComponent;
  let fixture: ComponentFixture<RegisterFormUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
