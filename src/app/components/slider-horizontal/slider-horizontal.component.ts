import { Component } from '@angular/core';
import { BannerService } from '../../services/banner.service';
import { Banner } from '../../models/banner.model';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-slider-horizontal',
  imports: [
    CommonModule,
    NgFor
  ],
  templateUrl: './slider-horizontal.component.html',
  styleUrl: './slider-horizontal.component.css'
})
export class SliderHorizontalComponent {
  pubs: Banner[]=[];

  constructor(
    private bannerService: BannerService
  ){
    
  }
  ngOnInit(): void {
    this.listBanner();
  }
  listBanner(): void {
    this.bannerService.getBannerActivos().subscribe((resp:any)=>{
      this.pubs = resp.data;
      console.log(resp.data);

    })
  }
}
