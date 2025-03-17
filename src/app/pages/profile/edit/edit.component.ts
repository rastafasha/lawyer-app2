import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    HeaderComponent,
        MenuFooterComponent, 
        BackButtnComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  pageTitle= 'Edit Profile';

}
