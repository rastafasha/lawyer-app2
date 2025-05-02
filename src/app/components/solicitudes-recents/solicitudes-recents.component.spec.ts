import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRecentsComponent } from './solicitudes-recents.component';

describe('SolicitudesRecentsComponent', () => {
  let component: SolicitudesRecentsComponent;
  let fixture: ComponentFixture<SolicitudesRecentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesRecentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesRecentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
