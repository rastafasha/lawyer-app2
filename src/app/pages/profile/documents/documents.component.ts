import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { RouterLink } from '@angular/router';
import { LateralComponent } from '../../../components/lateral/lateral.component';

@Component({
  selector: 'app-documents',
  imports: [
    CommonModule,
        HeaderComponent,
            MenuFooterComponent, 
            BackButtnComponent,
            RouterLink,
            LateralComponent
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  pageTitle= 'Documents';
}
