import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-footer',
  imports: [RouterLink, CommonModule],
  templateUrl: './menu-footer.component.html',
  styleUrl: './menu-footer.component.css'
})
export class MenuFooterComponent {
  
}
