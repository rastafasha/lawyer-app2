import { Component } from '@angular/core';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { ListProductsInternoComponent } from '../../components/list-products-interno/list-products-interno.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';


@Component({
  selector: 'app-favorites',
  imports: [
    MenuFooterComponent,
    HeaderComponent,
    CommonModule,
    LateralComponent,
    ListProductsInternoComponent,
    BackButtnComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  pageTitle = 'Favorites';
}
