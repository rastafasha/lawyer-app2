import { Component } from '@angular/core';
import { Speciality } from '../../models/speciality.model';
import { SpecialitiesService } from '../../services/specialities.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonLoaderComponent } from '../../shared/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-categoria-horizontal',
  imports: [NgFor, RouterModule, NgIf,  CommonModule, SkeletonLoaderComponent],
  templateUrl: './categoria-horizontal.component.html',
  styleUrl: './categoria-horizontal.component.css'
})
export class CategoriaHorizontalComponent {
  public isLoading:boolean = false;
  public specialities: Speciality[]= [];
  user: Usuario;
  constructor(
    private specialitiesService: SpecialitiesService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
   }

ngOnInit() {
  this.isLoading = true;
  this.specialitiesService.getSpecialitys().subscribe((specialities: Speciality[]) => {
    this.specialities = specialities;
    this.isLoading = false;
  });
}
}
