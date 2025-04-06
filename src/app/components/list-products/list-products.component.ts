import { Component } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { SpecialitiesService } from '../../services/specialities.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { LoadingComponent } from '../../shared/loading/loading.component';
@Component({
  selector: 'app-list-products',
  imports: [CommonModule, NgFor, RouterModule, ImagenPipe, LoadingComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {

  public isLoading:boolean = false;
  loadingTitle!:string;
 public profiles!: Profile[];

 constructor(
  private profileService: ProfileService,
)

{} 
ngOnInit(): void {
  this.getProfiles();

}

getProfiles(){
  this.isLoading = true;
  this.loadingTitle = 'Cargando Perfiles';
    this.profileService.getProfileRecientes().subscribe((resp:any) => {
      // console.log(resp);
      this.profiles = resp.data;
      this.isLoading = false;
      
    })
  }

}
