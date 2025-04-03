import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public user: Usuario
  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }


  openMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu ");
    for (var i = 0; i<menuLateral.length; i++) {
       menuLateral[i].classList.add("active");

    }
    console.log('pulsado');
  }
  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu ");
    for (var i = 0; i<menuLateral.length; i++) {
       menuLateral[i].classList.remove("active");
    }
  }

  logout(){
    this.authService.logout();
  }
}
