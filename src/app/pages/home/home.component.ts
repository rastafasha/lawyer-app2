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

  private translate = inject(TranslateService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  
  constructor(
  ){
    this.user = this.authService.getUser();
    this.translate.use('es'); // Set default language
  }

  ngOnInit(){
    window.scrollTo(0, 0);
    console.log(this.user);
    this.user_id = this.user.id;
    this.getClienteProfile()
  }

  getClienteProfile(){
    this.userService.showUser(this.user_id).subscribe((resp:any)=>{
      console.log('respuesta para miembro',resp);
      this.client = resp.user[0];
      this.profile = resp.user[0].profile;
      

      this.redessociales = typeof resp.user[0].profile.redessociales === 'string' 
            ? JSON.parse(resp.user[0].profile.redessociales) || []
            : resp.user[0].profile.redessociales || [];

            console.log(this.redessociales);
    })
  }


}
