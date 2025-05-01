import { Component, inject } from '@angular/core';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { Solicitud, SolicitudesUsers } from '../../models/solicitud.model';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../services/usuario.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { ClientService } from '../../services/client.service';
import { Profile, RedesSociales } from '../../models/profile.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wallet',
  imports: [
    MenuFooterComponent, HeaderComponent,
    CommonModule, RouterLink, 
    // LateralComponent,
    BackButtnComponent,
    NgFor, TranslateModule,
    InfiniteScrollDirective,
    LoadingComponent, NgIf,
    FormsModule,
    ReactiveFormsModule,
    ImagenPipe
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {
  pageTitle='Agenda';

  loadingTitle!:string;
  isRefreshing = false;
  isLoading = false;
  isEdnOfList = false;

  public user!: Usuario;
  public cliente!: Usuario;
  public rol?:string;
  public solicitudes: Solicitud[]=[];
  public solicitud_users: SolicitudesUsers[]=[];
  public user_client_id!: number;
  public user_member_id!: number;
  public client_id!: any;
  public pedido: any = [];
  public clientes: any = [];

  option_selected:number = 1;
  solicitud_selected:any = null;
  cliente_selected:any = null;
  status!:number ;

  pedido_selected:any;
  profile!:Profile;
  public text_success = '';
  public text_validation = '';

  public redessociales!: RedesSociales[];

  private solicitudService = inject(SolicitudesService);
  private clientService = inject(ClientService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  

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


  closeReload(){
    this.pedido_selected = null;
    this.ngOnInit();
  }

  

  getSolicitudDetail(item:any){
    this.pedido_selected = item.id;
    this.solicitudService.getSolicitud(this.pedido_selected).subscribe((resp:any)=>{
      this.solicitud_users = resp.solicitud_users || [];
      this.client_id = resp.solicitud_users[0].client_id;
      this.user_client_id = resp.solicitud_users[0].user_id;
      console.log(resp.solicitud_users);
      this.getClienteSolicitud() 
      
    })
  }

  getClienteSolicitud(){
    this.clientService.getClient(this.client_id).subscribe((resp:any)=>{
      console.log('respuesta para miembro',resp);
      this.cliente = resp[0];
      this.profile = resp[0].profile;
    })
  }

  

  onScrollDown(){
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

  onScrollUp(){
    this.refreshData(); 
  }



    refreshData() { 
      this.isRefreshing = true; 
      // Simulate data fetching 
      setTimeout(() => { 
        this.isRefreshing = false; 
        // Update your data here 
        this.getSolicitudesbyMember();
      }, 2000); 
    }

    optionSelected(value:number){
      this.option_selected = value;
      if(this.option_selected === 1){

        this.ngOnInit();
      }
      if(this.option_selected === 2){
        this.solicitud_selected = null;
        // console.log('pidiendo clientes');
        this.user_member_id = this.user.id;
        this.user_client_id = this.user.id;
        // this.getClientesbyuser();
        this.getClientesbyuser();
        
      }
    }

    getClientesbyuser(){
      this.isLoading = true;
      this.clientService.getClientsByUser(this.user_member_id).subscribe((resp:any)=>{
        // console.log('clientes',resp);
        this.clientes = resp;
        this.isLoading = false;
        
        // console.log(this.pedido);
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

    clienteSelected(cliente:any){
      this.cliente_selected = cliente;
      console.log(this.cliente_selected);
      this.getClienteContact();
    }

    getClienteContact(){
      this.clientService.getClient(this.cliente_selected.id).subscribe((resp:any)=>{
        console.log('respuesta para contact',resp);
        this.cliente = resp[0];
        this.profile = resp[0].profile;
        this.redessociales = typeof resp[0].profile.redessociales === 'string' 
        ? JSON.parse(resp[0].profile.redessociales) || []
        : resp.profile.redessociales || [];
      })
    }

    cambiarStatus(pedido:any, status:any){
      console.log(pedido);
      console.log(status);
      if(status === false){
        this.solicitud_selected.status = 1;
      }
      if(status === true){
        this.solicitud_selected.status = 2;
      }

      const data ={
        // id:this.solicitud_selected.id,
        status: this.solicitud_selected.status,
        pedido: this.pedido
      }
      
      this.solicitudService.updateSolicitudStatus(data, this.solicitud_selected.id).subscribe((resp:any)=>{
        console.log(resp);
      })
      
    }

    addClient(){
    
            const formData = new FormData();
          formData.append("client_id", this.cliente.id+'');
          formData.append("user_id", this.user.id+'');
    
            this.clientService.addClienttoUser(formData).subscribe({
              next: (resp:any) => {
                this.cliente = resp;
                Swal.fire('Éxito!', 'Cliente creado correctamente', 'success');
                this.ngOnInit();
              }
              ,error: (err) => {
                Swal.fire('Error', 'Error al crear el cliente', 'error');
                console.error(err);
              }
            });
    
          }

          deleteContact(){
            const formData = new FormData();
            formData.append("client_id", this.cliente.id+'');
            formData.append("user_id", this.user.id+'');
    
            this.clientService.removeClient(this.cliente.id, this.user.id).subscribe({
              next: (resp:any) => {
                this.cliente = resp;
                Swal.fire('Éxito!', 'Cliente eliminado correctamente', 'success');
                this.ngOnInit();
              }
              ,error: (err) => {
                Swal.fire('Error', 'Error al eliminar el cliente', 'error');
                console.error(err);
              }
            });
          }
}
