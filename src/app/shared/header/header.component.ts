import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { ImagenPipe } from '../../pipes/imagen.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, ImagenPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public user: Usuario;
  public profile: Profile = new Profile();

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {
    this.user = this.authService.getUser();
  }
  
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getProfile();
  }

  getProfile() {
    this.profileService.getByUser(this.user.id).subscribe((resp:any) => {
      this.profile = resp.profile;
    });
  }

  openMenu() {
    const menuLateral = document.getElementsByClassName("sidemenu");
    for (let i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.add("active");
    }
  }

  closeMenu() {
    const menuLateral = document.getElementsByClassName("sidemenu");
    for (let i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.remove("active");
    }
  }

  logout() {
    this.authService.logout();
  }
}
