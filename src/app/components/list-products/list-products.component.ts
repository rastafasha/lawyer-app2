import { Component } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { SpecialitiesService } from '../../services/specialities.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen.pipe';
@Component({
  selector: 'app-list-products',
  imports: [CommonModule, NgFor, RouterModule, ImagenPipe],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {

 public profiles!: Profile[];

 constructor(
  private profileService: ProfileService,
)

{} 
ngOnInit(): void {
  this.getProfiles();

}

getProfiles(){
    this.profileService.getProfileRecientes().subscribe((resp:any) => {
      // console.log(resp);
      this.profiles = resp.data;
      
    })
  }

}
