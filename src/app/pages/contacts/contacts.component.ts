import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import Swal from 'sweetalert2';
import { Profile, RedesSociales } from '../../models/profile.model';
import { Solicitud, SolicitudesUsers } from '../../models/solicitud.model';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { RatingStarComponent } from '../../components/ratingStar/ratingStar.component';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { RedessocialesComponent } from '../../shared/redessociales/redessociales.component';
declare var bootstrap: any;
@Component({
  selector: 'app-contacts',
  imports: [
    MenuFooterComponent, HeaderComponent,
    CommonModule,
    BackButtnComponent,
    NgFor, TranslateModule,
    InfiniteScrollDirective,
    LoadingComponent, NgIf,
    FormsModule,
    ReactiveFormsModule,
    ImagenPipe,
    RatingStarComponent,
    RouterLink,
    RedessocialesComponent
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  pageTitle = 'Contactos';

  loadingTitle!: string;
  isRefreshing = false;
  isLoading = false;
  isLoadingFicha = false;
  isEdnOfList = false;

  public user!: any;
  public client!: Usuario;
  public user_selected!: Usuario;
  public client_selected!: Usuario;
  public rol?: string;
  public solicitudes: Solicitud[] = [];
  public solicitud_users: SolicitudesUsers[] = [];
  public user_client_id!: number;
  public user_member_id!: number;
  public client_id!: any;
  public pedido: any = [];
  public clientes: any = [];

  option_selected: number = 1;
  solicitud_selected: any = null;
  cliente_selected: any = null;
  status!: number;

  pedido_selected: any;
  profile!: Profile;
  public text_success = '';
  public text_validation = '';

  public redessociales!: RedesSociales[];

  private solicitudService = inject(SolicitudesService);
  private clientService = inject(ClientService);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);

  ngOnInit() {
    window.scrollTo(0, 0);
    this.user = this.authService.getLocalStorage();
    this.rol = this.user.role;

    this.getClientesbyuser()
  }

  getClientesbyuser() {
    this.isLoading = true;
    this.clientService.getMyClients(this.user.uid).subscribe((resp: any) => {
      this.clientes = resp.clients;
      this.isLoading = false;
    })

  }



  closeReload() {
    this.pedido_selected = null;
    this.ngOnInit();
  }



  onScrollDown() {
    // if (!this.nextUrl || this.isLoading) return;
    // this.favoriteService.getCharacters(this.nextUrl).subscribe({
    //   next: (resp: any) => {
    //     if (resp.info.next) {
    //       this.nextUrl = resp.info.next;
    //       this.characters = [...this.characters, ...resp.results];
    //     } else {
    //       this.isEdnOfList = true;
    //       this.loadingTitle = 'No hay más personajes para mostrar';
    //       alert('ultima pagina');
    //     }
    //   },
    //   error: () => {
    //     this.isLoading = false;
    //   }
    // });
  }

  onScrollUp() {
    this.refreshData();
  }

  refreshData() {
    this.isRefreshing = true;
    // Simulate data fetching 
    setTimeout(() => {
      this.isRefreshing = false;
      this.getClientesbyuser();
      // Update your data here 
    }, 2000);
  }


  abrirDetalle(cliente: any) {
    this.cliente_selected = cliente;
    // 1. Abrir Offcanvas
    const el = document.getElementById('offcanvasNotif');
    const bsOffcanvas = new bootstrap.Offcanvas(el);
    bsOffcanvas.show();
    this.getClienteContact();
  }

  getClienteContact() {
    this.isLoadingFicha = true;
    this.profileService.getByUser(this.cliente_selected).subscribe((resp: any) => {
      this.profile = resp;

      // this.client_id = this.client.uid;
      this.profile = resp.profile;
      this.redessociales = typeof resp.profile.redssociales === 'string'
        ? JSON.parse(resp[0].profile.redssociales) || []
        : resp.profile.redssociales || [];
      this.isLoadingFicha = false;
    })
  }

  cambiarStatus(pedido: any, status: any) {
    if (status === false) {
      this.solicitud_selected.status = 1;
    }
    if (status === true) {
      this.solicitud_selected.status = 2;
    }

    const data = {
      // id:this.solicitud_selected.id,
      status: this.solicitud_selected.status,
      pedido: this.pedido
    }

    this.solicitudService.updateSolicitudStatus(data, this.solicitud_selected.id).subscribe((resp: any) => {
      console.log(resp);
    })

  }

  addClient() {

    const formData = new FormData();
    formData.append("client_id", this.client.uid + '');
    formData.append("user_id", this.user.uid + '');

    this.clientService.addClienttoUser(formData).subscribe({
      next: (resp: any) => {
        this.client = resp;
        Swal.fire('Éxito!', 'Cliente creado correctamente', 'success');
        this.ngOnInit();
      }
      , error: (err) => {
        Swal.fire('Error', 'Error al crear el cliente', 'error');
        console.error(err);
      }
    });

  }



  deleteContact(cliente_selected: any) {
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
        this.clientService.removeClient(cliente_selected).subscribe(
          response => {
            this.closeModal.emit();
            this.ngOnInit();
          }
        )
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.closeModal.emit();
        this.ngOnInit();
      }
    });
  }

  onRatingChanged(event: any) {
    console.log(event);
    this.solicitud_selected.rating = event;
    const data = {
      // id:this.solicitud_selected.id,
      rating: this.solicitud_selected.rating,
      pedido: this.pedido
    }

    this.solicitudService.updateSolicitudStatus(data, this.solicitud_selected.id).subscribe((resp: any) => {
      console.log(resp);
    })
  }



}
