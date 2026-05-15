import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CintamiembroComponent } from './cintamiembro.component';

describe('CintamiembroComponent', () => {
  let component: CintamiembroComponent;
  let fixture: ComponentFixture<CintamiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CintamiembroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CintamiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
