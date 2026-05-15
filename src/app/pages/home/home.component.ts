import { Component, HostListener, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { CommonModule, NgFor } from '@angular/common';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { SolicitudesRecentsComponent } from '../../components/solicitudes-recents/solicitudes-recents.component';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { Speciality } from '../../models/speciality.model';
import { SpecialitiesService } from '../../services/specialities.service';
import { CintamiembroComponent } from '../../shared/cintamiembro/cintamiembro.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent, MenuFooterComponent,
    AvisoComponent, 
    LateralComponent, 
    SolicitudesRecentsComponent,
    CommonModule, BackButtnComponent,
    TranslateModule,
    CintamiembroComponent
    
  ],
  providers: [TranslateService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  pageTitle = 'Home';
  user!: any;
  users: any = [];
  isLoading = false;
  profile!: Profile;
  redessociales: any;
  user_id!:number;
  client!:Usuario;

  public speciality_profile!: Speciality;
    public speciality!: Speciality ;

  private translate = inject(TranslateService);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private specialityService = inject(SpecialitiesService);
  
  constructor(
  ){
    this.user = this.authService.getLocalStorage();
    this.translate.use('es'); // Set default language
  }

  ngOnInit(){
    window.scrollTo(0, 0);
    this.user_id = this.user.uid;
    this.getClienteProfile()
  }

  getClienteProfile(){
    
    this.profileService.getByUser(this.user_id).subscribe((resp:any) => {
      // console.log(resp);
      this.profile = resp.profile || null;
      this.redessociales = typeof resp.profile.redessociales === 'string' 
            ? JSON.parse(resp.profile.redessociales) || []
            : resp.profile.redessociales || [];
      this.speciality_profile = resp.profile.especialidad;
      this.isLoading = false;
      this.getSpeciality();
    })
  }

  getSpeciality(){
    this.specialityService.getSpeciality(this.speciality_profile).subscribe((resp:any) => {
      this.speciality = resp.nombre || null;

    })
  }


}
