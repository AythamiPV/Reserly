import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWebsiteComponent } from './company-website.component';

describe('CompanyWebsiteComponent', () => {
  let component: CompanyWebsiteComponent;
  let fixture: ComponentFixture<CompanyWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyWebsiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
