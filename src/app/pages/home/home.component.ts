import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { CategoriaHorizontalComponent } from '../../components/categoria-horizontal/categoria-horizontal.component';
import { SliderHorizontalComponent } from '../../components/slider-horizontal/slider-horizontal.component';
import { ListProductsComponent } from '../../components/list-products/list-products.component';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { ListProductsHComponent } from '../../components/list-products-h/list-products-h.component';
import { CommonModule } from '@angular/common';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { ListaUsuariosComponent } from '../../components/ListaUsuarios/ListaUsuarios.component';
import { UserService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent, MenuFooterComponent,
    AvisoComponent, CategoriaHorizontalComponent,
    SliderHorizontalComponent, ListProductsComponent,
    LateralComponent, ListProductsHComponent,
    CommonModule, BackButtnComponent, ListaUsuariosComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pageTitle = 'Home';
  user: Usuario;
  users: any = [];

  constructor(
    private authService: AuthService,
  ){
    this.user = this.authService.getUser();

  }

  ngOninit() {
  }

  


}
