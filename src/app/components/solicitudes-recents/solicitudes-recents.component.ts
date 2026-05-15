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
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;
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
  private toastr = inject(ToastrService);

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

  abrirDetalle(item: any) {
    this.solicitud_selected = item;
    // 1. Abrir Offcanvas
    const el = document.getElementById('offcanvasNotif');
    const bsOffcanvas = new bootstrap.Offcanvas(el);
    bsOffcanvas.show();
  }

   cambiarStatus(status: any) {
      // 1. Validación de seguridad
      if (!this.solicitud_selected) return;
  
      // 2. Enviamos EXCLUSIVAMENTE el status en el cuerpo de la petición
      const data = {
        status: status.toUpperCase()
      };
  
      this.solicitudService.updateSolicitudStatus(data, this.solicitud_selected._id)
        .subscribe({
          next: (resp: any) => {
            if (resp.ok) {
              // 3. Vaciamos la selección para cerrar modales o limpiar la vista de detalle
              this.solicitud_selected = null;
              this.toastr.success('¡Éxito!', 'El estado de la solicitud ha sido actualizado')
  
              // 4. Refrescamos la lista general llamando al ciclo de vida
              this.ngOnInit();
            }
          },
          error: (err) => {
            console.error('Error al actualizar status:', err);
            this.toastr.error('Error', 'No se pudo cambiar el estado de la solicitud')
          }
        });
    }
  
  
    addClient() {
      const formData = new FormData();
      formData.append("client_id", this.client.uid + '');
      formData.append("user_id", this.user.uid + '');
  
      this.clientService.addClienttoUser(formData).subscribe({
        next: (resp: any) => {
          this.client = resp;
          this.toastr.success('¡Éxito!', 'Cliente creado correctamente')
          this.ngOnInit();
        }
        , error: (err) => {
          this.toastr.error('Error', 'Error al crear el cliente')
          console.error(err);
        }
      });
    }
  
  
  
  
    deleteContact(client_id: any) {
      Swal.fire({
        title: 'Estas Seguro?',
        text: "No podras recuperarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientService.removeClient(client_id).subscribe(
            response => {
              this.ngOnInit();
            }
          )
          Swal.fire(
            'Borrado!',
            'El client fue borrado.',
            'success'
          )
          this.ngOnInit();
        }
      });
    }
  


}
