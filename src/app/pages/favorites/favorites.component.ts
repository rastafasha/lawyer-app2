import { Component, HostListener, inject, TrackByFunction } from '@angular/core';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { ListProductsInternoComponent } from '../../components/list-products-interno/list-products-interno.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FavoritoService } from '../../services/favorito.service';
import { InfiniteScrollDirective, InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-favorites',
  imports: [
    MenuFooterComponent,
    HeaderComponent,
    CommonModule,
    LateralComponent,
    BackButtnComponent,
    LoadingComponent,
    InfiniteScrollModule,
    InfiniteScrollDirective,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  pageTitle = 'Favorites';
  loadingTitle!:string;
  isRefreshing = false;
  isLoading = false;
  isEdnOfList = false;
  private startY: number = 0;
  private currentY: number = 0;

    characters: Array<any> = [];
    nextUrl:string = '';
    private favoriteService = inject(FavoritoService);

    ngOnInit():void{
      this.getCharactrs();
    }

    getCharactrs(){
      this.isLoading = true;
      this.favoriteService.getCharacters().subscribe(
        (response: any) => {
          this.characters = response.results;
          this.nextUrl = response.info.next;
          this.isLoading = false;
      })
    }

    onScrollDown(){
      if (!this.nextUrl || this.isLoading) return;
      
      // this.isLoading = true;
      this.favoriteService.getCharacters(this.nextUrl).subscribe({
        next: (resp: any) => {
          if (resp.info.next) {
            this.nextUrl = resp.info.next;
            this.characters = [...this.characters, ...resp.results];
          } else {
            this.isEdnOfList = true;
            this.loadingTitle = 'No hay más personajes para mostrar';
          }
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }

    onScrollUp(){
      // this.isLoading = true;
      // this.getCharactrs();
      // this.isLoading = false;
    }

    trackByCharacterId: TrackByFunction<any>  = (index: number, character: any) => character.id;


     
      @HostListener('touchstart', ['$event']) 
      onTouchStart(event: TouchEvent) { 
        // Logic to detect the start of a touch event 
        this.startY = event.touches[0].clientY;
        this.refreshData(); 
      } 
     
      // @HostListener('touchmove', ['$event']) 
      // onTouchMove(event: TouchEvent) { 
      //   // Logic to detect the pull down gesture 
      //   this.currentY = event.touches[0].clientY; 
      //   const distance = this.currentY - this.startY; 
      //   if (distance > 0) { 
      //     // Update the UI to show the pull-down effect 
      //     // e.g., increase the position of pull-down indicator 
      //   } 
      // } 
     
      // @HostListener('touchend', ['$event']) 
      // onTouchEnd(event: TouchEvent) { 
      //   // Logic to handle the refresh action
      //   const distance = this.currentY - this.startY; 
      //   if (distance > 100) { // Adjust threshold as needed 
      //     this.isRefreshing = true; 
      //     this.refreshData(); 
      //   }  
      // } 
     
      refreshData() { 
        this.isRefreshing = true; 
        // Simulate data fetching 
        setTimeout(() => { 
          this.isRefreshing = false; 
          // Update your data here 
          this.getCharactrs();
        }, 2000); 
      }
      
      

  }
