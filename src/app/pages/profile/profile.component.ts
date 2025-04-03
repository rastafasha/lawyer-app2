import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterLink } from '@angular/router';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { Speciality } from '../../models/speciality.model';

@Component({
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    MenuFooterComponent, 
    LateralComponent, 
    BackButtnComponent
  ],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  pageTitle= 'Profile';
  public user!: Usuario;
  public profile!: Profile;
  public speciality!: Speciality;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log(this.user);
    this.getProfile();
  }

  getProfile(){
    this.profileService.getByUser(this.user.id).subscribe((resp:any) => {
      console.log(resp);
      this.profile = resp.profile;
      this.speciality = resp.speciality;
    })
  }
}
