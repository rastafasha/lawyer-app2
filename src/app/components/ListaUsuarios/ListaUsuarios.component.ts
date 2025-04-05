import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Profile } from '../../models/profile.model';
import { Speciality } from '../../models/speciality.model';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { SpecialitiesService } from '../../services/specialities.service';
import { UserService } from '../../services/usuario.service';
import { ProfileService } from '../../services/profile.service';
import { ImagenPipe } from '../../pipes/imagen.pipe';

@Component({
    selector: 'app-ListaUsuarios',
    templateUrl: './ListaUsuarios.component.html',
    imports: [CommonModule, RouterModule, NgIf, NgFor, ImagenPipe],
    styleUrls: ['./ListaUsuarios.component.css']
})
export class ListaUsuariosComponent {
    @Input() users: any[] = [];

      user: Usuario;
      speciality!:Speciality;
      Title!: string;
    
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
        this.usersServices.listUsers().subscribe((resp: any) => {
          console.log(resp);
          this.users = resp.users;
        //   this.speciality = resp.speciality;
        //   this.profiles = resp.users;
        });
      }
}