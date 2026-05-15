import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profile } from '../../../models/favorite.model';
import { PaypalSubcriptionService } from '../../../services/paypalSubcription.service';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../services/auth.service';
import { planPaypalSubcription, productPaypalSubcription, subcriptionGenerated, geSubcription } from '../../../models/planPaypalSubcription';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { PasarelaSubcriptionComponent } from '../pasarela-subcription/pasarela-subcription.component';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';

declare var bootstrap: any;

@Component({
  selector: 'app-allplans',
  templateUrl: './allplans.component.html',
  styleUrls: ['./allplans.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    TranslateModule,
    LoadingComponent,
    NgIf,
    RouterLink,
    PasarelaSubcriptionComponent,
    HeaderComponent,
    MenuFooterComponent,
    BackButtnComponent
],
})
export class AllPlansComponent implements OnInit {

  planPaypals!: planPaypalSubcription[];
  planPaypal!: planPaypalSubcription;
  plan!: planPaypalSubcription;
  products!: productPaypalSubcription;
  subcriptionG!: subcriptionGenerated;
  subcription!: geSubcription;
  error!: string;
  public user!: any;
  public profile!: Profile;
  isLoading = false;
  perfil: any = {};

  articulosVistos: number = 0;
  limiteAlcanzado: boolean = false;
  planActivado = false;

  planConfig!: planPaypalSubcription;
  planSeleccionado!: any | null;
  title = 'Planes de Subcripción'

  constructor(
    private paypalSubcription: PaypalSubcriptionService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanes();
    this.user = this.authService.getLocalStorage();
    this.getUserProfile();
  }

  getPlanes(): void {
    this.isLoading = true;
    this.paypalSubcription.getPlanPaypals().subscribe(
      res => {
        this.planPaypals = res.plans;
        this.isLoading = false;
      }
    );
  }



  getUserProfile() {
    this.profileService.getByUser(this.user.uid).subscribe(
      (resp: any) => {
        this.profile = resp;
      }
    );

  }

  openViewModal(plan: any) {
    this.planSeleccionado = plan;
    // 1. Abrir Offcanvas
    const el = document.getElementById('viewPlan');
    const bsOffcanvas = new bootstrap.Offcanvas(el);
    bsOffcanvas.show();
  }

  activarPlanGratis() {
    this.profileService.activarPlanGratuito().subscribe({
      next: (resp) => {
        // 1. Actualizas la vista para que el contador aparezca (3 - 0 = 3)
        this.articulosVistos = 0;
        this.limiteAlcanzado = false;
        this.planActivado = true;

        // 2. Avisas al usuario
        this.toastr.success('¡Ya tienes acceso a 3 artículos gratis este mes!');
      }
    });
  }



}
