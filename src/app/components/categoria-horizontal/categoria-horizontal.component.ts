import { Component } from '@angular/core';
import { Speciality } from '../../models/speciality.model';
import { SpecialitiesService } from '../../services/specialities.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-categoria-horizontal',
  imports: [NgFor],
  templateUrl: './categoria-horizontal.component.html',
  styleUrl: './categoria-horizontal.component.css'
})
export class CategoriaHorizontalComponent {

  public specialities: Speciality[]= [];
  user: Usuario;
  constructor(
    private specialitiesService: SpecialitiesService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
   }

ngOnInit() {
  this.specialitiesService.getSpecialitys().subscribe((specialities: Speciality[]) => {
    this.specialities = specialities;
  });
}
}
