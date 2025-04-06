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
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud } from '../../models/solicitud.model';
import Swal from 'sweetalert2';
import { ImagenPipe } from '../../pipes/imagen.pipe';

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
    ReactiveFormsModule,
    ImagenPipe
  ],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.scss'
})
export class EspecialistaComponent {
  pageTitle= 'Profile';
    public user!: Usuario;
    // public profile!: Profile;
    public profile: Profile = new Profile();
    public redessociales!: RedesSociales[];
    public precios!: Precios[];
    public speciality_profile!: Speciality;
    public speciality!: Speciality;
    public solicitud!: Solicitud;
    status!:Profile ;
    solicitudes_selected: any[] = [];
  
    constructor(
      private authService: AuthService,
      private profileService: ProfileService,
      private specialityService: SpecialitiesService,
      private solicitudService: SolicitudesService,
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
        this.redessociales = typeof resp.profile.redessociales === 'string' 
            ? JSON.parse(resp.profile.redessociales) || []
            : resp.profile.redessociales || [];

            this.precios = typeof resp.profile.precios === 'string' 
            ? JSON.parse(resp.profile.precios) || []
            : resp.profile.precios || [];
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

    cambiarStatus(data:any){
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
      if (!data || (Array.isArray(this.solicitudes_selected) && this.solicitudes_selected.length === 0)) {
        Swal.fire('Error', 'No valid solicitudes selected', 'error');
        return;
      }
      
      const datos = {
        id: 0,
        "user_id": this.profile.id,
        "cliente_id": this.user.id,
        pedido: data,
        status: 1,
        solicitudes_selected: this.solicitudes_selected || []
      }

      this.solicitudService.createSolicitud(datos).subscribe({
        next: (resp:any) => {
          this.solicitud = resp;
          Swal.fire('Éxito!', 'Solicitud creada correctamente', 'success');
          this.ngOnInit();
        },
        error: (err) => {
          Swal.fire('Error', 'Error al crear la solicitud', 'error');
          console.error(err);
        }
      });
    }
}
