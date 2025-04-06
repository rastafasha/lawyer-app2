import { Component } from '@angular/core';
import { BannerService } from '../../services/banner.service';
import { Banner } from '../../models/banner.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { SkeletonLoaderComponent } from '../../shared/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-slider-horizontal',
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    SkeletonLoaderComponent
  ],
  templateUrl: './slider-horizontal.component.html',
  styleUrl: './slider-horizontal.component.css'
})
export class SliderHorizontalComponent {
  pubs: Banner[]=[];
  public isLoading:boolean = false;

  constructor(
    private bannerService: BannerService
  ){
    
  }
  ngOnInit(): void {
    this.listBanner();
  }
  listBanner(): void {
    this.isLoading = true;
    this.bannerService.getBannerActivos().subscribe((resp:any)=>{
      this.pubs = resp.data;
      this.isLoading = false;

    })
  }
}
