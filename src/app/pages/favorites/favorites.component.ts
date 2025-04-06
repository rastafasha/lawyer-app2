import { Component, HostListener } from '@angular/core';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { ListProductsInternoComponent } from '../../components/list-products-interno/list-products-interno.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { LoadingComponent } from '../../shared/loading/loading.component';


@Component({
  selector: 'app-favorites',
  imports: [
    MenuFooterComponent,
    HeaderComponent,
    CommonModule,
    LateralComponent,
    BackButtnComponent,
    LoadingComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  pageTitle = 'Favorites';
  loadingTitle!:string;
  isRefreshing = false;
  isLoading = false;
    private startY: number = 0;
    private currentY: number = 0;
    currentPage = 1;
    itemsPerPage = 2;
    hasMore = true;



  @HostListener('touchstart', ['$event']) 
  onTouchStart(event: TouchEvent) { 
    // Logic to detect the start of a touch event 
    this.startY = event.touches[0].clientY;
    this.scrollDownToContinue();
  } 
 
  @HostListener('touchmove', ['$event']) 
  onTouchMove(event: TouchEvent) { 
    // Logic to detect the pull down gesture 
    this.currentY = event.touches[0].clientY; 
    const distance = this.currentY - this.startY; 
    if (distance > 0) { 
      // Update the UI to show the pull-down effect 
      // e.g., increase the position of pull-down indicator 
    } 
  } 
 
  @HostListener('touchend', ['$event']) 
  onTouchEnd(event: TouchEvent) { 
    // Logic to handle the refresh action
    const distance = this.currentY - this.startY; 
    if (distance > 100) { // Adjust threshold as needed 
      this.isRefreshing = true; 
      this.refreshData(); 
    }  
  } 
 
  refreshData() { 
    this.isRefreshing = true; 
    // Simulate data fetching 
    setTimeout(() => { 
      this.isRefreshing = false; 
      // Update your data here 
      // alert('refrescando data')
    }, 2000); 
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    
    if (pos > max - 100 && !this.isLoading && this.hasMore) {
      this.scrollDownToContinue();
    }
  }

  scrollDownToContinue() {
    if (this.isLoading || !this.hasMore) return;
    
    this.isLoading = true;
    this.loadingTitle = 'Cargando list...';
    this.currentPage++;
    // alert('pagina siguiente')
    // this.getProfiles();
    setTimeout(() => { 
      this.isLoading = false; 
      // Update your data here 
      // alert('pagina siguiente')
    }, 2000); 
  }

  // private checkIfMoreData(totalItems: number) {
  //   this.hasMore = this.users.length < totalItems;
  // }
}
