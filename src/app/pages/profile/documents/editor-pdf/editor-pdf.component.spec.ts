import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPdfComponent } from './editor-pdf.component';

describe('EditorPdfComponent', () => {
  let component: EditorPdfComponent;
  let fixture: ComponentFixture<EditorPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
