import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { Profile } from '../../models/profile.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SpecialitiesService } from '../../services/specialities.service';
import { Usuario } from '../../models/usuario.model';
import { Speciality } from '../../models/speciality.model';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { SkeletonLoaderComponent } from '../../shared/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-categoria',
  imports: [
    MenuFooterComponent,
        HeaderComponent,
        CommonModule,
        LateralComponent,
        BackButtnComponent,
        NgFor,
        RouterModule,
        ImagenPipe,
        SkeletonLoaderComponent
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  pageTitle = 'Especialidad';
  user: Usuario;
  profiles: Profile[] = [];
  speciality!:Speciality;
  Title!: string;
  public isLoading:boolean = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private specialityService: SpecialitiesService,
    
  ){
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.getSpeciality(id);
    });
  }
  getSpeciality(id: number) {
    this.isLoading = true;
    this.specialityService.getSpecialitywithUsers(id).subscribe((resp: any) => {
      // console.log(resp);
      this.Title = resp.speciality.title;
      this.speciality = resp.speciality;
      this.profiles = resp.users.data;
      this.isLoading = false;
    });
  }
}
