import { Component, HostListener } from '@angular/core';
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

  ngOnInit(){
    window.scrollTo(0, 0);
  }


  isRefreshing = false; 
  private startY: number = 0; 
private currentY: number = 0; 
 
  @HostListener('touchstart', ['$event']) 
  onTouchStart(event: TouchEvent) { 
    // Logic to detect the start of a touch event 
    this.startY = event.touches[0].clientY;
  } 
 
  @HostListener('touchmove', ['$event']) 
  onTouchMove(event: TouchEvent) { 
    // Logic to detect the pull down gesture 
    this.currentY = event.touches[0].clientY; 
    const distance = this.currentY - this.startY; 
    if (distance > 0) { 
      // Update the UI to show the pull-down effect 
      // e.g., increase the position of pull-down indicator 
    } 
  } 
 
  @HostListener('touchend', ['$event']) 
  onTouchEnd(event: TouchEvent) { 
    // Logic to handle the refresh action
    const distance = this.currentY - this.startY; 
    if (distance > 100) { // Adjust threshold as needed 
      this.isRefreshing = true; 
      this.refreshData(); 
    }  
  } 
 
  refreshData() { 
    this.isRefreshing = true; 
    // Simulate data fetching 
    setTimeout(() => { 
      this.isRefreshing = false; 
      // Update your data here 
    }, 2000); 
  } 

}
