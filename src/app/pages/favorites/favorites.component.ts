import { Component, HostListener, inject, TrackByFunction } from '@angular/core';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FavoritoService } from '../../services/favorito.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  imports: [
    MenuFooterComponent,
    HeaderComponent,
    CommonModule,
    LateralComponent,
    BackButtnComponent,
    LoadingComponent,
    InfiniteScrollDirective,
    TranslateModule,
    ReactiveFormsModule,
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
  searchForm!: FormGroup;
  name_file ='';

    characters: Array<any> = [];
    nextUrl:string = '';
    private favoriteService = inject(FavoritoService);
    private fb = inject(FormBuilder);

    ngOnInit():void{
      window.scrollTo(0, 0);
      this.getCharactrs();
      this.validarFormularioPerfil();
      this.searchForm.reset();
    }

    validarFormularioPerfil(){
      this.searchForm = this.fb.group({
        pais: [''],
        speciality_id: [''],
        name_file: [''],
        rating: [''],
        id: [''],
      });
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
      this.favoriteService.getCharacters(this.nextUrl).subscribe({
        next: (resp: any) => {
          if (resp.info.next) {
            this.nextUrl = resp.info.next;
            this.characters = [...this.characters, ...resp.results];
          } else {
            this.isEdnOfList = true;
            this.loadingTitle = 'No hay más personajes para mostrar';
            alert('ultima pagina');
          }
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }

    onScrollUp(){
      this.refreshData(); 
    }

    trackByCharacterId: TrackByFunction<any>  = (index: number, character: any) => character.id;


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
