import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { BackButtnComponent } from '../../../../shared/backButtn/backButtn.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

declare const saveDocument: any;
declare const loadDocument: any;

@Component({
  selector: 'app-editor-pdf',
  imports: [
    HeaderComponent,
    BackButtnComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './editor-pdf.component.html',
  styleUrl: './editor-pdf.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditorPdfComponent {
  public Editor: typeof ClassicEditor | null = null;

  pageTitle = 'Editor PDF';

  onClickSave() {
    saveDocument();
}

onClickLoad() {
    loadDocument();
}

}
