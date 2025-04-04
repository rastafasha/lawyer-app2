import { Component } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { SpecialitiesService } from '../../services/specialities.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-products-h',
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './list-products-h.component.html',
  styleUrl: './list-products-h.component.css'
})
export class ListProductsHComponent {

  public profiles!: Profile[];
  
   constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private specialityService: SpecialitiesService)
  {} 
  ngOnInit(): void {
    this.getProfiles();
  
  }
  
  getProfiles(){
      this.profileService.getProfileDestacados().subscribe((resp:any) => {
        // console.log(resp);
        this.profiles = resp;
        
      })
    }
  

}

