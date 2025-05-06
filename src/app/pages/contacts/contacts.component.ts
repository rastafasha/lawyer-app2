import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
import { UserService } from '../../services/usuario.service';
import { RatingStarComponent } from '../../components/ratingStar/ratingStar.component';

@Component({
  selector: 'app-contacts',
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
    ImagenPipe,
    RatingStarComponent
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  pageTitle='Contactos';

  loadingTitle!:string;
  isRefreshing = false;
  isLoading = false;
  isEdnOfList = false;
  
  public client!: Usuario;
  public user_selected!: Usuario;
  public client_selected!: Usuario;
  public user!: Usuario;
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
    
    this.getClientesbyuser()
    
    
  }


  closeReload(){
    this.pedido_selected = null;
    this.ngOnInit();
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
        this.getClientesbyuser();
      }, 2000); 
    }

    

    getClientesbyuser(){
      this.isLoading = true;
      this.clientService.getClientsByUser(this.user.id).subscribe((resp:any)=>{
        // console.log('clientes',resp);
        this.clientes = resp;
        this.isLoading = false;
        
        // console.log(this.pedido);
      })
      
    }
    


    clienteSelected(cliente:any){
      this.cliente_selected = cliente;
      // console.log(this.cliente_selected);
      this.getClienteContact();
    }

    getClienteContact(){
      this.clientService.getClient(this.cliente_selected.id).subscribe((resp:any)=>{
        // console.log('respuesta para contact',resp);
        this.client= resp[0];
        this.profile = resp[0].profile;
        this.redessociales = typeof resp[0].profile.redessociales === 'string' 
        ? JSON.parse(resp[0].profile.redessociales) || []
        : resp.profile.redessociales || [];
      })
    }

    cambiarStatus(pedido:any, status:any){
      // console.log(pedido);
      // console.log(status);
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
          formData.append("client_id", this.client.id+'');
          formData.append("user_id", this.user.id+'');
    
            this.clientService.addClienttoUser(formData).subscribe({
              next: (resp:any) => {
                this.client = resp;
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
            formData.append("client_id", this.client.id+'');
            formData.append("user_id", this.user.id+'');
    
            this.clientService.removeClient( this.user.id, this.client.id).subscribe({
              next: (resp:any) => {
                this.client = resp;
                Swal.fire('Éxito!', 'client eliminado correctamente', 'success');
                this.ngOnInit();
              }
              ,error: (err) => {
                Swal.fire('Error', 'Error al eliminar el client', 'error');
                console.error(err);
              }
            });
          }

          onRatingChanged(event:any){
            console.log(event);
            this.solicitud_selected.rating = event;
            const data ={
              // id:this.solicitud_selected.id,
              rating: this.solicitud_selected.rating,
              pedido: this.pedido
            }
            
            this.solicitudService.updateSolicitudStatus(data, this.solicitud_selected.id).subscribe((resp:any)=>{
              console.log(resp);
            })
          }
}
