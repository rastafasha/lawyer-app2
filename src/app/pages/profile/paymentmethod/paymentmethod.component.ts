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
import { LoadingComponent } from '../../../shared/loading/loading.component';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paymentmethod',
  imports: [
    CommonModule,
    HeaderComponent,
    MenuFooterComponent,
    BackButtnComponent,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    TranslateModule
  ],
  templateUrl: './paymentmethod.component.html',
  styleUrl: './paymentmethod.component.scss',
})
export class PaymentmethodComponent {
  pageTitle = 'Payment Methods';
  public tiposdepagos: PaymentMethod[] = [];
  public tiposdepagosuser: PaymentMethod[] = [];
  public user!: any;
  isLoading: boolean = false;
  user_id!: number;
  tipoSeleccionado: any;
  pagoSeleccionado: any;

  public paymentMForm!: FormGroup;

  username!: PaymentMethod;
  bankAccountType!: string;
  bankName!: string;
  bankAccount!: string;
  ciorif!: string;
  phone!: string;
  email!: string;
  tipo!: string;
  id!: number;

  constructor(
    private authService: AuthService,
    private paymentMService: PaymentmethodService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.user = this.authService.getLocalStorage();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user_id = this.user.uid;
    this.getPaymentMethodByUserId();

  }


  getPaymentMethodByUserId() {
    this.isLoading = true;
    this.paymentMService.getPaymentMethodByUserId(this.user_id).subscribe(
      (resp: any) => {
        this.tiposdepagosuser = resp;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );
  }


  selectedTypeEdit(tipo: any) {
    this.pagoSeleccionado = tipo.value;
    // console.log(this.pagoSeleccionado);
  }

  selectedType(tipodepago: any) {
    this.tipoSeleccionado = tipodepago;
    // console.log(this.tipoSeleccionado);
  }


  cambiarStatus(tipodepago: any) {
    let VALUE = tipodepago.status;
    // console.log(VALUE);

    this.paymentMService.updateStatus(tipodepago.status, tipodepago._id).subscribe(
      (resp: any) => {
        this.toastr.success('Actualizado', `actualizado correctamente`)
        this.getPaymentMethodByUserId();
      }
    )
  }



  save() {

    let data = {
      tipo: this.tipo,
      bankAccountType: this.bankAccountType,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      ciorif: this.ciorif,
      phone: this.phone,
      email: this.email,
      user: this.user.uid
    }
    this.paymentMService.createPaymentmethod(data).subscribe((resp: any) => {
      this.toastr.success('Exito', `Creado correctamente`)
      this.tipo = '';
      this.bankAccountType = '';
      this.bankName = '';
      this.bankAccount = '';
      this.ciorif = '';
      this.phone = '';
      this.email = '';
      this.ngOnInit();
    })
  }


  deleteTipoPago(tiposdepago: any) {
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
        this.paymentMService.deletePaymentmethod(tiposdepago.id).subscribe(
          response => {
            this.getPaymentMethodByUserId();
          }
        );
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.ngOnInit();
      }
    });
  }

}
