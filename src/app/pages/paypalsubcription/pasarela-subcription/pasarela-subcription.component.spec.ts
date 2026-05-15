import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasarelaSubcriptionComponent } from './pasarela-subcription.component';

describe('PasarelaSubcriptionComponent', () => {
  let component: PasarelaSubcriptionComponent;
  let fixture: ComponentFixture<PasarelaSubcriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasarelaSubcriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasarelaSubcriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
