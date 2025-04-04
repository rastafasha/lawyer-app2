import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-aviso',
  imports: [RouterLink, NgIf],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.css'
})
export class AvisoComponent {
  user: Usuario;
  user_id!: number;
  profile!: Profile ;
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {
    this.user = this.authService.getUser();
  }
  ngOnInit() {
    this.user_id = this.user.id;
    this.getProfile();
  }
  getProfile() {
    this.profileService.getByUser(this.user_id).subscribe({
      next: (res) => {
        this.profile = res.profile;
        // console.log(this.profile);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
