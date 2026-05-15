import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlansComponent } from './allplans.component';

describe('AllComponent', () => {
  let component: AllPlansComponent;
  let fixture: ComponentFixture<AllPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
