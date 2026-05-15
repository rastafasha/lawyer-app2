import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { Client } from '../../models/client.model';
import { Profile, RedesSociales, Precios } from '../../models/profile.model';
import { Solicitud } from '../../models/solicitud.model';
import { Speciality } from '../../models/speciality.model';
import { Usuario } from '../../models/usuario.model';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SpecialitiesService } from '../../services/specialities.service';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { ClientService } from '../../services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientprofile',
  imports: [
    CommonModule,
    HeaderComponent,
    MenuFooterComponent,
    LateralComponent,
    BackButtnComponent,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    ImagenPipe,
    LoadingComponent,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './clientprofile.component.html',
  styleUrl: './clientprofile.component.scss'
})
export class ClientprofileComponent {
  pageTitle = 'Profile';
  public user!: any;
  public client!: Client;

  public isLoading: boolean = false;
  loadingTitle!: string;
  // public profile!: Profile;
  public profile!: Profile;
  public redessociales!: RedesSociales[];
  public precios!: Precios[];
  public speciality_profile!: Speciality;
  public speciality!: Speciality;
  public solicitud!: Solicitud;
  status!: Profile;
  role!: Profile;
  solicitudes_selected: any[] = [];

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userName: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl(''),
    state: new FormControl('Caracas'),
    zipCode: new FormControl(''),
    isAgree: new FormControl(false),

  });


  constructor(
    private authService: AuthService,
    private _clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.user = this.authService.getLocalStorage();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe(({ id }) => {
      this.getClient(id);
    });
    // this.validarFormularioPerfil();

  }

  getClient(id: any) {
    this.isLoading = true;
    this.loadingTitle = 'Cargando cliente';
    this._clientService.getClient(id).subscribe((resp: any) => {
      if (resp.status === '404' || resp.ok === false) {
        alert('no hay cliente')
        this.isLoading = false;
      }
      this.client = resp;
      this.profile = resp.profile;
      if (this.client) {
        this.isLoading = false;
      }

      if (this.profile) {

        this.redessociales = typeof resp.profile.redessociales === 'string'
          ? JSON.parse(resp.profile.redessociales) || []
          : resp.profile.redessociales || [];

        this.isLoading = false;
      }
    })

  }

  addClient() {

    const data ={
      client: this.client,
      usuario: this.user.uid
    }

    this._clientService.addClienttoUser(data).subscribe({
      next: (resp: any) => {
        this.client = resp;
        this.toastr.success('Éxito!', 'Cliente creado correctamente')
        this.ngOnInit();
      }
      , error: (err) => {
        this.toastr.error('Error', 'Error al crear el cliente')
        console.error(err);
      }
    });

  }
  removeClient() {
    //   const formData = new FormData();
    // formData.append("client_id", this.client.id+'');
    // formData.append("user_id", this.user.id+'');

    //   this.clientService.removeClient(formData).subscribe({
    //     next: (resp:any) => {
    //       this.client = resp;
    //       Swal.fire('Éxito!', 'Cliente eliminado correctamente', 'success');
    //       this.ngOnInit();
    //     }
    //     ,error: (err) => {
    //       Swal.fire('Error', 'Error al eliminar el cliente', 'error');
    //       console.error(err);
    //     }
    //   });
  }

}
