import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud, SolicitudesUsers } from '../../models/solicitud.model';
import { Usuario } from '../../models/usuario.model';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { Profile } from '../../models/profile.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitudes-recents',
  imports: [
    LoadingComponent,
    BackButtnComponent,
    CommonModule,
    TranslateModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './solicitudes-recents.component.html',
  styleUrl: './solicitudes-recents.component.scss'
})
export class SolicitudesRecentsComponent {
  pageTitle='Solicitudes';
  
    loadingTitle!:string;
    isRefreshing = false;
    isLoading = false;
    isEdnOfList = false;
  
    public user!: Usuario;
    public cliente!: Usuario;
    public client_id!: number;
    public rol?:string;
    public solicitudes: Solicitud[]=[];
    public solicitud_users: SolicitudesUsers[]=[];
    public pedido: any = [];
    solicitud_selected:any = null;

    option_selected:number = 1;
      cliente_selected:any = null;
      pedido_selected:any;
      status!:number ;
      profile!:Profile;

  private solicitudService = inject(SolicitudesService);
  private clientService = inject(ClientService);
  private authService = inject(AuthService);

  ngOnInit(){
    window.scrollTo(0, 0);
    this.user = this.authService.getUser();
    this.rol = this.user.roles[0];
    this.getSolicitudesbyMember();
    
    
  }

  getSolicitudesbyMember(){
    this.isLoading = true;
    this.solicitudService.getByMember(this.user.id).subscribe((resp:any)=>{
      this.solicitudes = resp.data;
      this.pedido = typeof resp.pedido === 'string' 
            ? JSON.parse(resp.pedido) || []
            : resp.pedido || [];
      // console.log(this.pedido);
      this.isLoading = false;
      
    })
  }

  solicitudSelected(solicitud:any){
    this.solicitud_selected = solicitud;
    this.getSolicitudDetail(solicitud);
    console.log(solicitud);
    // this.pedido = this.solicitud_selected.pedido;
    this.pedido = typeof solicitud.pedido === 'string' 
    ? JSON.parse(solicitud.pedido) || []
    : solicitud.pedido || [];
    console.log(this.pedido);
  }

  getSolicitudDetail(item:any){
    this.pedido_selected = item.id;
    this.solicitudService.getSolicitud(this.pedido_selected).subscribe((resp:any)=>{
      this.solicitud_users = resp.solicitud_users || [];
      this.client_id = resp.solicitud_users[0].client_id;
      console.log(resp.solicitud_users);

      this.getClienteSolicitud();
    })
  }

  getClienteSolicitud(){
    this.clientService.getClient(this.client_id).subscribe((resp:any)=>{
      console.log('respuesta para miembro',resp);
      this.cliente = resp[0];
      this.profile = resp[0].profile;
    })
  }


}
