import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Profile } from '../../../models/profile.model';
import { Speciality } from '../../../models/speciality.model';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    HeaderComponent,
        MenuFooterComponent, 
        BackButtnComponent,
        ReactiveFormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  pageTitle= 'Edit Profile';

  public user!: Usuario;
    public profile!: Profile;
    public speciality!: Speciality;

    public perfilForm!: FormGroup;
    public profileSeleccionado!: Profile;
  
    constructor(
      private authService: AuthService,
      private activatedRoute: ActivatedRoute,
      private profileService: ProfileService,
      private fb: FormBuilder,
    ) {
      this.user = this.authService.getUser();
    }
  

    ngOnInit(): void {
      window.scrollTo(0,0);
      // this.closeMenu();
      this.validarFormularioPerfil();
      this.getProfile()
      // this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
      
    }

    getProfile(){
      this.profileService.getByUser(this.user.id).subscribe((resp:any) => {
        console.log(resp);
        this.profile = resp.profile;
        this.speciality = resp.speciality;
      })
    }




  iniciarFormularioPerfil(id:string){
    if (!id == null || !id == undefined || id) {
      this.profileService.getByUser(id).subscribe(
        (res:any) => {
          this.perfilForm.patchValue({
            id: res.id,
            nombre: this.profile.nombre,
            surname: this.profile.surname,
            direccion: this.profile.direccion,
            pais: this.profile.pais,
            estado: this.profile.estado,
            ciudad: this.profile.ciudad,
            telhome: this.profile.telhome,
            telmovil: this.profile.telmovil,
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
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      surname: ['', Validators.required],
      pais: [''],
      estado: [''],
      ciudad: [''],
      telhome: ['', Validators.required],
      telmovil: ['', Validators.required],
      shortdescription: ['', Validators.required],
      redessociales: [''],
      usuario: [this.user.id],
      id: [''],
    });
  }

  // get first_name() {
  //   return this.perfilForm.get('first_name');
  // }

  // get last_name() {
  //   return this.perfilForm.get('last_name');
  // }

  // get pais() {
  //   return this.perfilForm.get('pais');
  // }
  // get estado() {
  //   return this.perfilForm.get('estado');
  // }
  // get ciudad() {
  //   return this.perfilForm.get('ciudad');
  // }
  // get shortdescription() {
  //   return this.perfilForm.get('shortdescription');
  // }
  // get telmovil() {
  //   return this.perfilForm.get('telmovil');
  // }
  // get emailPaypal() {
  //   return this.perfilForm.get('emailPaypal');
  // }
  // get facebook() {
  //   return this.perfilForm.get('facebook');
  // }
  // get instagram() {
  //   return this.perfilForm.get('instagram');
  // }
  // get twitter() {
  //   return this.perfilForm.get('twitter');
  // }
  // get nombrePaypal() {
  //   return this.perfilForm.get('nombrePaypal');
  // }
  // get linkedin() {
  //   return this.perfilForm.get('linkedin');
  // }
  // get image() {
  //   return this.perfilForm.get('adicional');
  // }

}
