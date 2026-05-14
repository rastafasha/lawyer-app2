import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud, SolicitudesUsers } from '../../models/solicitud.model';
import { Usuario } from '../../models/usuario.model';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Profile } from '../../models/profile.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitudes-recents',
  imports: [
    LoadingComponent,
    CommonModule,
    TranslateModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './solicitudes-recents.component.html',
  styleUrl: './solicitudes-recents.component.scss'
})
export class SolicitudesRecentsComponent {
  pageTitle = 'Solicitudes';
  @Input() user!: any;
  loadingTitle!: string;
  isRefreshing = false;
  isLoading = false;
  isEdnOfList = false;

  public client!: Usuario;
  public client_id!: number;
  public rol?: string;
  public solicitudes: Solicitud[] = [];
  public solicitud_users: SolicitudesUsers[] = [];
  public pedido: any = [];
  solicitud_selected: any = null;

  option_selected: number = 1;
  cliente_selected: any = null;
  pedido_selected: any;
  status!: number;
  profile!: Profile;

  private solicitudService = inject(SolicitudesService);
  private clientService = inject(ClientService);
  private authService = inject(AuthService);

  ngOnInit() {
    window.scrollTo(0, 0);
    this.user = this.authService.getLocalStorage();
    this.rol = this.user.role;
    this.getSolicitudesbyMember();


  }

  getSolicitudesbyMember() {
    this.isLoading = true;
    this.solicitudService.getByMember(this.user.uid).subscribe((resp: any) => {
      this.solicitudes = resp;
      this.pedido = typeof resp.pedido === 'string'
        ? JSON.parse(resp.pedido) || []
        : resp.pedido || [];
      // console.log(this.pedido);
      this.isLoading = false;

    })
  }

  solicitudSelected(solicitud: any) {
    this.solicitud_selected = solicitud;
  }

  


}
