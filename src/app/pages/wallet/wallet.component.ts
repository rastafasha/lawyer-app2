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

@Component({
  selector: 'app-wallet',
  imports: [
    MenuFooterComponent, HeaderComponent,
    CommonModule, RouterLink, 
    // LateralComponent,
    BackButtnComponent,
    NgFor, TranslateModule,
    InfiniteScrollDirective,
    LoadingComponent, NgIf
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
  public user_cliente_id!: number;
  public user_member_id!: number;
  public cliente_id!: any;
  public pedido: any = [];
  public clientes: any = [];

  option_selected:number = 1;
  solicitud_selected:any;

  pedido_selected:any;
  public text_success = '';
  public text_validation = '';

  private solicitudService = inject(SolicitudesService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  

  ngOnInit(){
    window.scrollTo(0, 0);
    this.user = this.authService.getUser();
    this.rol = this.user.roles[0];
    console.log(this.rol);
    if(this.rol === 'MEMBER'){
      this.getSolicitudesbyMember();
    }
    if(this.rol === 'GUEST'){
      this.getSolicitudesbyGuest();
    }
    
  }

  getSolicitudesbyMember(){
    this.isLoading = true;
    this.solicitudService.getByMember(this.user.id).subscribe((resp:any)=>{
      this.solicitudes = resp;
      this.pedido = typeof resp.pedido === 'string' 
            ? JSON.parse(resp.pedido) || []
            : resp.pedido || [];
      // console.log(resp);
      // console.log(this.pedido);
      this.isLoading = false;
    })
  }

  getSolicitudesbyGuest(){
    this.solicitudService.getByGuest(this.user.id).subscribe((resp:any)=>{
      this.solicitudes = resp;
      this.pedido = typeof resp.pedido === 'string' 
            ? JSON.parse(resp.pedido) || []
            : resp.pedido || [];
      // console.log('respuesta de invitado',resp);
    })
  }

  closeReload(){
    this.pedido_selected = null;
    this.ngOnInit();
  }

  

  getSolicitudDetail(item:any){
    this.pedido_selected = item.id;
    this.solicitudService.getSolicitud(this.pedido_selected).subscribe((resp:any)=>{
      console.log(resp);
      // this.publicidadd = resp.publicidad;
      this.solicitud_users = resp.solicitud_users || [];
      this.cliente_id = resp.solicitud_users[0].cliente_id;
      this.user_cliente_id = resp.solicitud_users[0].user_id;
      // console.log(this.solicitud_users);
      // console.log(this.cliente_id);
      // Buscamos el cliente_id dentro del array solicitud_users
      // if (Array.isArray(this.solicitud_users)) {
      //   const foundUser = this.solicitud_users.find((element:any) => 
      //     element.cliente_id === this.cliente_id
      //   );
      //   if (foundUser) {
      //     this.cliente_id = foundUser.cliente_id;
      //   }
      // }
      
      if(this.rol === 'MEMBER'){
        this.getClienteSolicitud() 
      }
      if(this.rol === 'GUEST'){
        this.getClienteSolicitud() 
        console.log('soy guest');
      }
      
    })
  }

  getClienteSolicitud(){
    if(this.cliente_id){
      this.userService.showUser(this.cliente_id).subscribe((resp:any)=>{
        console.log('respuesta para miembro',resp);
        this.cliente = resp.user[0];
        // console.log(this.cliente);
      })
    }
    if(this.user_cliente_id){
      this.userService.showUser(this.user_cliente_id).subscribe((resp:any)=>{
        console.log('respuesta para guest',resp);
        this.cliente = resp.user[0];
        // console.log(this.cliente);
      })
    }
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
      if(this.option_selected === 2){
        console.log('pidiendo clientes');
        this.user_member_id = this.user.id;
        this.user_cliente_id = this.user.id;
        this.getClientesbyuser();
        
        if(this.rol === 'MEMBER'){
          this.getClientesbyuser();
        }
        if(this.rol === 'GUEST'){
          this.getContactosbyCliente();
        }
      }
    }

    getClientesbyuser(){
      this.isLoading = true;
      this.solicitudService.getByClientesUser(this.user_member_id).subscribe((resp:any)=>{
        console.log('clientes',resp);
        // this.clientes = resp.clientes;
        this.isLoading = false;
        
        // console.log(this.pedido);
      })
      
    }
    getContactosbyCliente(){
      this.isLoading = true;
      this.solicitudService.getByContactosCliente(this.user_cliente_id).subscribe((resp:any)=>{
        console.log('contactos',resp);
        this.clientes = resp.users;
        this.isLoading = false;
        
        // console.log(this.pedido);
      })
    }

    solicitudSelected(solicitud:any){
      this.solicitud_selected = solicitud;
      this.getSolicitudDetail(solicitud);
      console.log(solicitud);
      this.pedido = typeof solicitud.pedido === 'string' 
            ? JSON.parse(solicitud.pedido) || []
            : solicitud.pedido || [];
    }

}
