import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { PaymentMethod } from '../../../models/paymentmethod.model';
import { Usuario } from '../../../models/usuario.model';
import { PaymentmethodService } from '../../../services/paymentmethod.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paymentmethod',
  imports: [
    CommonModule,
    HeaderComponent,
    MenuFooterComponent,
    BackButtnComponent,
    NgFor,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './paymentmethod.component.html',
  styleUrl: './paymentmethod.component.scss',
})
export class PaymentmethodComponent {
  pageTitle = 'Payment Methods';
  public tiposdepagos: PaymentMethod [] = [];
  public tiposdepagosuser: PaymentMethod [] = [];
  public user!: Usuario;
  user_id!:number;
  tipoSeleccionado:any;
  pagoSeleccionado:any;

  public paymentMForm!: FormGroup;

  username!:PaymentMethod;
  bankAccountType!:PaymentMethod;
  bankName!:PaymentMethod;
  bankAccount!:PaymentMethod;
  ciorif!:PaymentMethod;
  phone!:PaymentMethod;
  email!:PaymentMethod;
  tipo!:PaymentMethod;
  id!:number;

  constructor(
    private paymentMService: PaymentmethodService,
    private authService: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user = this.authService.getUser();
  }
  ngOninit(): void {
    // this.getPaymentMethods();
    this.user_id = this.user.id;
    console.log('hola',this.user_id);
    this.getPaymentMethods();
    this.getPaymentMethodByUserId();
    this.getTiposdePago();

  }

  // iniciarFormularioPerfil(id:number){
  //   if (!id == null || !id == undefined || id) {
  //     this.paymentMService.getPaymentMethodByUserId(id).subscribe(
  //       (res:any) => {
  //         // this.userForm.patchValue({
  //         //   id: res.id,
  //         //   nombre: this.profile.nombre,
  //         //   surname: this.profile.surname,
            
  //         //   direccion: this.profile.direccion,
  //         //   description: this.profile.description,
  //         //   pais: this.profile.pais,
  //         //   estado: this.profile.estado,
  //         //   ciudad: this.profile.ciudad,
  //         //   telhome: this.profile.telhome,
  //         //   telmovil: this.profile.telmovil,
  //         //   speciality_id: this.profile.speciality_id,
  //         //   usuario: this.user.id,
  //         // });
  //         // this.profileSeleccionado = res.profile;
  //         console.log('profileSeleccionado',res);

  //       }

  //     );
  //   } else {
  //     this.pageTitle = 'Crear Perfil';
  //   }



  // }

  // validarFormularioPerfil(){
  //   this.paymentMForm = this.fb.group({
  //     nombre: ['', Validators.required],
  //     surname: ['', Validators.required],
  //     pais: [''],
  //     estado: [''],
  //     ciudad: [''],
  //     telhome: ['', Validators.required],
  //     telmovil: ['', Validators.required],
  //     speciality_id: ['', Validators.required],
  //     direccion: [''],
  //     n_doc: [''],
  //     gender: [''],
  //     description: ['', Validators.required],
  //     usuario: [this.user.id],
  //     id: [''],
  //   });
  // }


  getPaymentMethods() {
    this.paymentMService.getPaymentmethods().subscribe(
      (resp: any) => {
        this.tiposdepagos = resp;
        console.log(this.tiposdepagos);
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );
  }
  getPaymentMethodByUserId() {
    this.paymentMService.getPaymentMethodByUserId(this.user.id).subscribe(
      (resp: any) => {
        this.tiposdepagosuser = resp;
        console.log(this.tiposdepagosuser);
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );
  }


  selectedTypeEdit(tipo:any){
    this.pagoSeleccionado = tipo.value;
    // console.log(this.pagoSeleccionado);
}

selectedType(tipodepago:any){
    this.tipoSeleccionado = tipodepago;
    // console.log(this.tipoSeleccionado);
}

getTiposdePago(){
    this.paymentMService.getPaymentmethods().subscribe(paymentMethods=>{
      console.log(paymentMethods);
      this.tiposdepagos = paymentMethods;
      // console.log(this.tiposdepagos);
    })
}
getTiposdePagoByUser(){
    this.paymentMService.getPaymentMethodByUserId(this.user.id).subscribe(paymentMethods =>{
      console.log(paymentMethods);
      this.tiposdepagos = paymentMethods;
      // console.log(this.tiposdepagos);
    })
}

cambiarStatus(tipodepago:any){
    let VALUE = tipodepago.status;
    // console.log(VALUE);
    
    this.paymentMService.updateStatus(tipodepago).subscribe(
      resp =>{
        // console.log(resp);
        // Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        // this.toaster.open({
        //   text:'Producto Actualizado!',
        //   caption:'Mensaje de Validación',
        //   type:'success',
        // })
        this.getPaymentMethodByUserId();
      }
    )
  }



save(){

    // let data = {
    //   tipo: this.tipo,
    //   bankAccountType: this.bankAccountType,
    //   bankName: this.bankName,
    //   bankAccount: this.bankAccount,
    //   ciorif:this.ciorif,
    //   phone:this.phone,
    //   email: this.email,
    //   user: this.user.uid
    // }
    // this.paymentMService.crearPaymentMethod(data).subscribe((resp:any)=>{
    //   // console.log(resp);
    //   this.tipo = '';
    //   this.bankAccountType = '';
    //   this.bankName = '';
    //   this.bankAccount = '';
    //   this.ciorif = '';
    //   this.phone = '';
    //   this.email = '';
    //   this.ngOnInit();
    // })
  }

deleteTipoPago(tiposdepago:any){

    this.paymentMService.deletePaymentmethod(tiposdepago._id).subscribe(
      (resp:any) =>{
        this.getPaymentMethodByUserId();
        
      });
    
  }

}
