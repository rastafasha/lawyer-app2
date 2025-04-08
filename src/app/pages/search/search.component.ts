import { Component, inject, TrackByFunction } from '@angular/core';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { SliderHorizontalComponent } from '../../components/slider-horizontal/slider-horizontal.component';
import { ListProductsComponent } from '../../components/list-products/list-products.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FavoritoService } from '../../services/favorito.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../models/pais';
import { Speciality } from '../../models/speciality.model';
import { SpecialitiesService } from '../../services/specialities.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [MenuFooterComponent, HeaderComponent, 
    LateralComponent, BackButtnComponent,
    InfiniteScrollDirective,
    LoadingComponent,NgFor,NgIf, TranslateModule,
    ReactiveFormsModule, FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  pageTitle= 'Directory';
  loadingTitle!:string;
  isRefreshing = false;
  isLoading = false;
  isEdnOfList = false;
  characters: Array<any> = [];
    nextUrl:string = '';
    search!:string;

    public paises :Pais[] = [];
    public specialities :Speciality[] = [];

    searchForm!:FormGroup;

  private favoriteService = inject(FavoritoService);
  private paisService = inject(PaisService);
  private specialityService = inject(SpecialitiesService);
  private fb = inject(FormBuilder);

  // searchForm: FormGroup = new FormGroup({
  //   pais: new FormControl('', ),
  //   speciality_id: new FormControl('',),
  //   status: new FormControl('', ),

  //   });

  ngOnInit():void{
    window.scrollTo(0, 0);
    this.getCharactrs();
    this.getPaisesList();
    this.getSpecialitiesList();
    this.validarFormularioPerfil();
  }

  getPaisesList(): void {
    this.paisService.getPaises().subscribe(
      (res:any) =>{
        this.paises = res.paises;
        console.log(res);
      }
    );
  }

  getSpecialitiesList(){
    this.specialityService.getSpecialitys().subscribe((resp:any)=>{
      this.specialities = resp;
      console.log(resp);
    })
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

    validarFormularioPerfil(){
      this.searchForm = this.fb.group({
        pais: [''],
        speciality_id: [''],
        rating: [''],
        id: [''],
      });
    }
    
    onSearch(){
      const formValue = this.searchForm.value;
      console.log(this.searchForm.value);
      // this.search = this.search.toLowerCase();
      // this.characters = this.characters.filter((character: any) => {
      //   return character.name.toLowerCase().includes(this.search);
      //   });
      } 

      PageSize(): void {
        // this.pageSelection = [];
        // this.limit = this.pageSize;
        // this.skip = 0;
        // this.currentPage = 1;
        this.searchForm.reset();
      }
    
}
