import { Component, OnInit, ElementRef, ViewChild, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import {
  PayPalScriptService,
  IPayPalConfig,
  NgxPaypalComponent,
  ICreateOrderRequest,
  NgxPayPalModule,
} from "ngx-paypal";

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { environment } from '../../../environments/environment';
import { planPaypalSubcription, subcriptionGenerated } from '../../../models/planPaypalSubcription';
import { PaypalSubcriptionService } from '../../../services/paypalSubcription.service';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../services/auth.service';

// declare var paypal;

@Component({
  selector: 'app-pasarela-subcription',
  templateUrl: './pasarela-subcription.component.html',
  styleUrls: ['./pasarela-subcription.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NgIf,
    NgxPayPalModule
  ],
})
export class PasarelaSubcriptionComponent implements OnInit {

  @ViewChild('paypal') paypalElement!: ElementRef;
  @ViewChild("advanced") advancedSubscription?: NgxPaypalComponent;
  @Input() planSeleccionado: any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  private plans = [];
  public planes!: planPaypalSubcription;
  public plan!: planPaypalSubcription;
  public planpaypal!: planPaypalSubcription;
  public planId!: planPaypalSubcription;
  public configs = {};
  subcriptionG!: subcriptionGenerated;
  respuesta: any;
  user: any;
  error: any;

  public SubcriptionConfig?: IPayPalConfig;

  constructor(
    private router: Router,
    private payPalScriptService: PayPalScriptService,
    private payPalService: PaypalSubcriptionService,
    private profileService: ProfileService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.user = this.authService.getLocalStorage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['planSeleccionado'] && changes['planSeleccionado'].currentValue) {
      // 1. "Apagamos" el botón inmediatamente para limpiar el DOM
      this.planpaypal;

      // 2. Ejecutamos la lógica de carga
      this.getPlan();
    }
  }

  getPlan(): void {
    const idPlan = this.planSeleccionado?.id;
    if (!idPlan) return;

    this.payPalService.getPlanPaypal(idPlan).subscribe({
      next: (res) => {
        // 3. Preparamos la configuración ANTES de mostrar el botón
        // Usamos el ID que viene de tu backend (res.id)
        this.initConfig(res.id);

        // 4. Esperamos un "respiro" del DOM para evitar el error de Zoid
        setTimeout(() => {
          this.planpaypal = res;
        }, 200); // 200ms es más seguro para que el iFrame anterior muera
      },
      error: (err) => this.error = err
    });
  }

  calcularTotal(): number {
    // Forzamos a todo el objeto planpaypal a ser tratado como 'any' para evitar el bloqueo estricto del índice 0
    const plan = this.planpaypal as any;

    const precio = Number(plan?.billing_cycles?.[0]?.pricing_scheme?.fixed_price?.value || 0);
    const setup = Number(plan?.payment_preferences?.setup_fee?.value || 0);

    return precio + setup;
  }

  iniciarPaypal() {
    // 1. Limpiar el contenedor del botón para evitar duplicados/errores de zoid
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = '';
    }

    // 2. Limpiar scripts previos (tu lógica actual está bien, pero añade esto)
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src.includes('paypal')) {
        scripts[i].remove();
      }
    }

    // 3. Registrar de nuevo
    this.payPalScriptService.registerPayPalScript({
      clientId: environment.clientSubscripcionesSandboxId,
      currency: 'USD',
      vault: 'true',
      intent: 'subscription'
    }, (payPalApi) => {
      this.renderizarBoton(payPalApi);
    });
  }

  renderizarBoton(payPalApi: any) {
    payPalApi.Buttons({
      intent: 'subscription',
      createSubscription: (data: any, actions: any) => {
        return actions.subscription.create({
          plan_id: this.planSeleccionado.id
        });
      },
      // ... resto de tu config
    }).render('#paypal-button-container');
  }

  ngOnDestroy() {
    // Elimina el script de PayPal al salir para que no choque al volver a entrar
    const script = document.querySelector('script[src*="://paypal.com"]');
    if (script) {
      script.remove();
    }
  }








  private initConfig(id: string): void {
    this.SubcriptionConfig = {
      clientId: environment.clientSubscripcionesSandboxId,
      currency: 'USD',
      vault: 'true', // Obligatorio para suscripciones
      advanced: {
        extraQueryParams: [
          { name: 'intent', value: 'subscription' } // ESTO es lo que lee el SDK al cargar
        ]
      },
      // Forzamos el tipado con 'as any' para que acepte (data, actions)
      createSubscriptionOnClient: (data: any) => ({
        plan_id: id,
        custom_id: this.user.uid // Usa el ID de tu usuario aquí
      }),
      onApprove: (data: any, actions: any) => {
        // En el momento que el botón diga "Subscribe", data.subscriptionID existirá
        console.log('ID de Suscripción:', data.subscriptionID);
        if (data.subscriptionID) {
          this.profileService.saveSubscriptionId(this.user.uid, data.subscriptionID).subscribe(() => {
            this.router.navigateByUrl('/checkout/gracias');
          });
        }
      }
      ,
      onError: err => {
        console.error('Error en el flujo de PayPal:', err);
      }
    };
  }


  paypalplanId(id: string, status: string, email_address: string, payer_id: string, value: string, subscriptionID: any, paypalplanId: any) {
    throw new Error('Method not implemented.');
  }


  onModalHidden(): void {
    this.closeModal.emit();

    // Force removal if Bootstrap's JS fails to clean up
    document.querySelectorAll('.offcanvas-backdrop').forEach(el => el.remove());
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }


}
