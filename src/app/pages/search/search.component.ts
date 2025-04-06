import { Component } from '@angular/core';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { SliderHorizontalComponent } from '../../components/slider-horizontal/slider-horizontal.component';
import { ListProductsComponent } from '../../components/list-products/list-products.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';

@Component({
  selector: 'app-search',
  imports: [MenuFooterComponent, HeaderComponent, 
    LateralComponent,
    ListProductsComponent, BackButtnComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  pageTitle= 'Search';
}
