import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Profile } from '../../models/profile.model';
import { Speciality } from '../../models/speciality.model';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { SpecialitiesService } from '../../services/specialities.service';
import { UserService } from '../../services/usuario.service';
import { ProfileService } from '../../services/profile.service';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
    selector: 'app-ListaUsuarios',
    templateUrl: './ListaUsuarios.component.html',
    imports: [CommonModule, RouterModule, NgIf, NgFor, ImagenPipe, LoadingComponent],
    styleUrls: ['./ListaUsuarios.component.css']
})
export class ListaUsuariosComponent {

  loadingTitle: string = 'Cargando usuarios...';
    @Input() users: any[] = [];
    currentPage = 1;
    itemsPerPage = 2;
    loading = false;
    hasMore = true;

    user: Usuario;
    speciality!: Speciality;
    Title!: string;

    isRefreshing = false;
    private startY: number = 0;
    private currentY: number = 0;



    
      constructor(
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private profileServices: ProfileService,
        private usersServices: UserService,
        
      ){
        this.user = this.authService.getUser();
      }
    
      ngOnInit() {
        
        this.getProfiles();
      }
    getProfiles() {
      this.loading = true;
      this.usersServices.listUsers(this.currentPage, this.itemsPerPage).subscribe({
        next: (resp: any) => {
          this.users = [...this.users, ...resp.users];
          this.checkIfMoreData(resp.total || 0);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }



 
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
      this.getProfiles();
    }, 2000); 
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    
    if (pos > max - 100 && !this.loading && this.hasMore) {
      this.scrollDownToContinue();
    }
  }

  scrollDownToContinue() {
    if (this.loading || !this.hasMore) return;
    
    this.loading = true;
    this.loadingTitle = 'Cargando list...';
    this.currentPage++;
    this.getProfiles();
    console.log(this.loadingTitle);
  }

  private checkIfMoreData(totalItems: number) {
    this.hasMore = this.users.length < totalItems;
  }
  
}