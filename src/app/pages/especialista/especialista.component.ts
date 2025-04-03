import { Component } from '@angular/core';
import { Precios, Profile, RedesSociales } from '../../models/profile.model';
import { Speciality } from '../../models/speciality.model';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { SpecialitiesService } from '../../services/specialities.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-especialista',
  imports: [
    CommonModule,
    HeaderComponent,
    MenuFooterComponent, 
    LateralComponent, 
    BackButtnComponent,
    NgFor,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.scss'
})
export class EspecialistaComponent {
  pageTitle= 'Profile';
    public user!: Usuario;
    public profile!: Profile;
    public redessociales!: RedesSociales[];
    public precios!: Precios[];
    public speciality_profile!: Speciality;
    public speciality!: Speciality;
    status!:Profile ;
  
    constructor(
      private authService: AuthService,
      private profileService: ProfileService,
      private specialityService: SpecialitiesService,
      private activatedRoute: ActivatedRoute,
    ) {
      this.user = this.authService.getUser();
    }
  
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(({ id }) => {
        this.getProfile(id);
      });

      
    }
  
    getProfile(id:number){
      this.profileService.getByUser(id).subscribe((resp:any) => {
        // console.log(resp);
        this.profile = resp.profile;
        this.redessociales = JSON.parse(resp.profile.redessociales);
        this.precios = JSON.parse(resp.profile.precios);
        this.speciality_profile = resp.profile.speciality_id;
        this.getSpeciality();
        // setTimeout(() => {
        // }
        // , 5000);
      })
    }
  
    getSpeciality(){
      this.specialityService.getSpeciality(this.speciality_profile).subscribe((resp:any) => {
        // console.log(resp);
        this.speciality = resp;
      })
    }

    cambiarStatus(data:any){debugger
      const VALUE = data;
      console.log(VALUE);

      const datos = {
        "status": VALUE
      }
      
      this.profileService.updateProfileStatus(datos, this.profile.id).subscribe(
        resp =>{
          console.log(resp);
          this.ngOnInit();
        }
      )
    }

    solicitarItem(data:any){
      
      const datos = {
        "user_id": this.user.id,
        data: data
      }
      console.log(datos);
      
    }
}
