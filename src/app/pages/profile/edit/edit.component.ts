import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Precios, Profile, RedesSociales } from '../../../models/profile.model';
import { Speciality } from '../../../models/speciality.model';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LateralComponent } from '../../../components/lateral/lateral.component';
import { SpecialitiesService } from '../../../services/specialities.service';
import { IconosService } from '../../../services/iconos.service';
import { Icons } from '../../../models/Icons';

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    HeaderComponent,
        MenuFooterComponent, 
        BackButtnComponent,
        ReactiveFormsModule,
        LateralComponent,
        FormsModule,
        NgFor 
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  pageTitle= 'Edit Profile';
  Title!:string;

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    userName: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl(''),
    state: new FormControl('Caracas'),
    zipCode: new FormControl(''),
    isAgree: new FormControl(false),

    });

  public user!: Usuario;
  public user_id!: number;
  public profile_id!: number;
  public speciality_id!: number;

    public profile!: Profile;
    // public redessociales: RedesSociales[] = []; // Initialize as an empty array
    public precios!: Precios;
    // public listIcons: Icons[] = [];
    public speciality!: Speciality;
    public specialities: Speciality [] = [];

    public perfilForm!: FormGroup;
    public profileSeleccionado!: Profile;

    public redessociales: any = [];
    public tarifas: any = [];
    description:any;
    item_tarifa:any;
    title:any;
    url:any;
    icono:any;
    precio:number = 0;
    cantidad:number = 0;
    amount = 0;

    public listIcons = [
      { icon: 'fa fa-facebook', name: 'Facebook' },
      { icon: 'fa fa-instagram', name: 'Instagram' },
      { icon: 'fa fa-twitter', name: 'Twitter' },
      { icon: 'fa fa-youtube', name: 'YouTube' },
      { icon: 'fa fa-linkedin', name: 'LinkedIn' },
      { icon: 'fa fa-github', name: 'Github' },
      { icon: 'fa fa-whatsapp', name: 'Whatsapp' },
      { icon: 'fa fa-skype', name: 'Skype' },
      { icon: 'fa fa-pinterest', name: 'Pinterest' },
      { icon: 'fa fa-twitch', name: 'Twitch' },
      { icon: 'fa fa-telegram', name: 'Telegram' },
      { icon: 'fa fa-discord', name: 'Discord' },
      { icon: 'fa fa-reddit', name: 'Reddit' },
      { icon: 'fa fa-medium', name: 'Medium' },
      { icon: 'fa fa-snapchat', name: 'Snapchat' },
      { icon: 'fa fa-yahoo', name: 'Yahoo' },
      { icon: 'fa fa-steam', name: 'Steam' },
    ]
  
    constructor(
      private authService: AuthService,
      private activatedRoute: ActivatedRoute,
      private profileService: ProfileService,
      private fb: FormBuilder,
      private specialityService: SpecialitiesService,
    ) {
      this.user = this.authService.getUser();
    }
  

    ngOnInit(): void {
      window.scrollTo(0,0);
      // this.closeMenu();
      this.user_id = this.user.id;
      this.validarFormularioPerfil();
      this.getProfile();
      this.getSpecialitys();
      this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
      this.Title = this.user.username;
      
    }

    getProfile(){
      this.profileService.getByUser(this.user.id).subscribe(
        (resp:any) => {
          console.log('Profile response:', resp); // Log the response
          this.profile = resp.profile;
          this.redessociales = JSON.parse(resp.profile.redessociales);
          this.tarifas = JSON.parse(resp.profile.precios);
          this.profile_id = resp.profile.id;
        },
        (error) => {
          console.error('Error fetching profile:', error); // Log any errors
        }
      );
    }

    getSpecialitys(){
      this.specialityService.getSpecialitys().subscribe((resp:Speciality[]) => {
        this.specialities = resp;
      });
    }




  iniciarFormularioPerfil(id:string){
    if (!id == null || !id == undefined || id) {
      this.profileService.getByUser(id).subscribe(
        (res:any) => {
          this.userForm.patchValue({
            id: res.id,
            nombre: this.profile.nombre,
            surname: this.profile.surname,
            direccion: this.profile.direccion,
            description: this.profile.description,
            pais: this.profile.pais,
            estado: this.profile.estado,
            ciudad: this.profile.ciudad,
            telhome: this.profile.telhome,
            telmovil: this.profile.telmovil,
            speciality_id: this.profile.speciality_id,
            // redessociales: this.profile.redessociales,
            usuario: this.user.id,
            // img: this.profile.img
          });
          this.profileSeleccionado = res.profile;
          console.log('profileSeleccionado',this.profileSeleccionado);

        }

      );
    } else {
      this.pageTitle = 'Crear Perfil';
    }



  }

  validarFormularioPerfil(){
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      surname: ['', Validators.required],
      pais: [''],
      estado: [''],
      ciudad: [''],
      telhome: ['', Validators.required],
      telmovil: ['', Validators.required],
      speciality_id: ['', Validators.required],
      direccion: [''],
      description: ['', Validators.required],
      usuario: [this.user.id],
      id: [''],
    });
  }

  // get first_name() {
  //   return this.perfilForm.get('first_name');
  // }



  addRedSocial() {
    if (this.title && this.url ) {
      this.redessociales.push({
        title: this.title,
        url: this.url,
        icono: this.icono,
      });
      this.title = '';
      this.url = '';
      this.icono = '';
      
    }
  }

  deletered(i:any){
    this.redessociales.splice(i,1);
    this.title = '';
    this.url = '';
    this.icono = '';
    
  }


  addMedicamento() {
    if (this.item_tarifa && this.precio > 0) {
      this.tarifas.push({
        item_tarifa: this.item_tarifa,
        cantidad: this.cantidad+'',
        precio: this.precio+''
      });
      this.item_tarifa = '';
      this.precio = 0;
      this.cantidad = 0;
      this.amount = 0;
      
    }
    this.amount = 0;
    for (let i = 0; i < this.tarifas.length; i++) {
      this.amount += parseFloat(this.tarifas[i].precio) * parseFloat(this.tarifas[i].cantidad);
    }
  }

  deleteMedical(i:any){
    this.tarifas.splice(i,1);
    this.item_tarifa = '';
    this.precio = 0;
    this.amount = 0;
    this.cantidad = 0;
    

    if(this.tarifas.length === 0){
      this.item_tarifa = '';
      this.precio = 0;
      this.cantidad = 0;
      this.amount = 0;
    }
  }


  onUserSave(){
    const formValue = this.userForm.value;
    


    const data ={
      redessociales: this.redessociales,
      precios: this.tarifas,
      // speciality: this.speciality.id,
      // speciality_id: this.speciality_id,

      nombre: formValue.nombre,
      apellidos: formValue.apellidos,
      pais: formValue.pais,
      estado: formValue.estado,

      ciudad: formValue.ciudad,
      telhome: formValue.telhome,
      telmovil: formValue.telmovil,
      shortdescription: formValue.shortdescription,
      usuario: this.user.id,
      id: formValue.id,
      user_id :this.user_id,
      profile_id :this.profile_id,
      // img: this.profile.img,

      ...this.userForm.value,

      
    }

    // console.log(formValue);
    // console.log(data);

    if(this.profile_id){
      this.profileService.updateProfile( data, this.profile_id).subscribe((resp:any) => {
        console.log(resp);
        this.profileSeleccionado = resp;
        // this.router.navigate(['/profile']);
      });
    }else{
      this.profileService.createProfile(data).subscribe((resp:any) => {
        console.log(resp);
        this.profileSeleccionado = resp;
        // this.router.navigate(['/profile']);
        });
    }

  }

}
