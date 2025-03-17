import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackButtnComponent } from '../../../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../../shared/menu-footer/menu-footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-files',
  imports: [
    CommonModule,
    HeaderComponent,
    MenuFooterComponent,
    BackButtnComponent,
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class FilesComponent {
  pageTitle= 'Files Documents';
}
