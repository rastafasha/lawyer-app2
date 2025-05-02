import { Component, HostListener, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { CategoriaHorizontalComponent } from '../../components/categoria-horizontal/categoria-horizontal.component';
import { SliderHorizontalComponent } from '../../components/slider-horizontal/slider-horizontal.component';
import { ListProductsComponent } from '../../components/list-products/list-products.component';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { ListProductsHComponent } from '../../components/list-products-h/list-products-h.component';
import { CommonModule, NgFor } from '@angular/common';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { ListaUsuariosComponent } from '../../components/ListaUsuarios/ListaUsuarios.component';
import { UserService } from '../../services/usuario.service';
import { SolicitudesRecentsComponent } from '../../components/solicitudes-recents/solicitudes-recents.component';
import { FichaprofileComponent } from '../../components/fichaprofile/fichaprofile.component';
import { Profile } from '../../models/profile.model';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { ProfileService } from '../../services/profile.service';
import { Speciality } from '../../models/speciality.model';
import { SpecialitiesService } from '../../services/specialities.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent, MenuFooterComponent,
    AvisoComponent, 
    SliderHorizontalComponent, 
    LateralComponent, 
    SolicitudesRecentsComponent,
    CommonModule, BackButtnComponent, ListaUsuariosComponent,
    TranslateModule,
    FichaprofileComponent,
    
  ],
  providers: [TranslateService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  pageTitle = 'Home';
  user!: Usuario;
  users: any = [];
  isLoading = false;
  profile: Profile = new Profile();
  redessociales: any;
  user_id!:number;
  client!:Client;

  public speciality_profile!: Speciality;
    public speciality!: Speciality ;

  private translate = inject(TranslateService);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private specialityService = inject(SpecialitiesService);
  
  constructor(
  ){
    this.user = this.authService.getUser();
    this.translate.use('es'); // Set default language
  }

  ngOnInit(){
    window.scrollTo(0, 0);
    this.user_id = this.user.id;
    this.getClienteProfile()
  }

  getClienteProfile(){
    
    this.profileService.getByUser(this.user.id).subscribe((resp:any) => {
      // console.log(resp);
      this.profile = resp.profile || null;
      this.redessociales = typeof resp.profile.redessociales === 'string' 
            ? JSON.parse(resp.profile.redessociales) || []
            : resp.profile.redessociales || [];
      this.speciality_profile = resp.profile.speciality_id;
      this.isLoading = false;
      this.getSpeciality();
    })
  }

  getSpeciality(){
    this.specialityService.getSpeciality(this.speciality_profile).subscribe((resp:any) => {
      
      this.speciality = resp.title || null;

    })
  }


}
