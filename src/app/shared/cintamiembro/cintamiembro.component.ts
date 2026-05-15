import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/favorite.model';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cintamiembro',
  templateUrl: './cintamiembro.component.html',
  styleUrls: ['./cintamiembro.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class CintamiembroComponent implements OnInit {
  @Input() articulosVistos: number = 0;
  @Input() limiteAlcanzado: boolean = false;
  @Input() planActivado = false;

  public user!: any;
  public userServer!: Usuario;
  error!: string;
  uid!: string;
  role!: any;
  roleid!: number;
  public identity!: Usuario;
  profile!: Profile[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private toastr: ToastrService,

  ) {
    this.user = this.authService.getLocalStorage();
  }
  ngOnInit(): void {
    const userStorage = localStorage.getItem('user');

    if (userStorage && userStorage !== 'undefined') {
      this.user = JSON.parse(userStorage);

      // Verificamos que el objeto parseado no sea null
      if (this.user) {
        this.role = this.user.role;
        this.uid = this.user.uid;
        this.getProfileData();
      }
    } else {
      // Si no hay usuario, el rol es null y no buscamos perfil
      this.role = null;
      this.user = null;
    }
  }



  getProfileData() {
    this.profileService.getByUser(this.uid).subscribe(
      (res:any) => {
        if (res) {
          this.profile = res;

          // Verificamos si es premium recorriendo el array de subcription que poblaste
          // const tieneSub = res.subcription.some(s => s.status === 'ACTIVE');

          // if (tieneSub) {
          //   this.role = 'MEMBER'; // Forzamos visualmente el rol premium
          //   this.limiteAlcanzado = false;
          // } else {
          //   this.articulosVistos = res.articulosVistos || 0;
          //   this.limiteAlcanzado = this.articulosVistos >= 3;
          // }
        }
      }
    );
  }

  cargarEstadoLecturas() {
    this.profileService.getByUser(this.uid).subscribe(perfil => {
      // this.articulosVistos = perfil.articulosVistos || 0;
      this.limiteAlcanzado = this.articulosVistos >= 3;

      // Si el usuario es premium, podrías incluso ocultar la barra
      // if (perfil.plan === 'premium') {
      //   this.role = 'PREMIUM'; // O manejarlo con otra variable
      // }
    });
  }

  gotoSubscripcion() {
    this.router.navigateByUrl('/plan-subcripcion');
  }
  irAlLogin() {
    this.router.navigateByUrl('/login');
  }
  irAlProfile() {
    this.router.navigate(['/user-acount', this.user.uid] );
  }

  activarPlanGratis() {
  this.profileService.activarPlanGratuito().subscribe({
    next: (resp) => {
      // 1. Actualizas la vista para que el contador aparezca (3 - 0 = 3)
      this.articulosVistos = 0;
      this.limiteAlcanzado = false;
      this.planActivado = true;
      
      // 2. Avisas al usuario
      this.toastr.success('¡Ya tienes acceso a 3 artículos gratis este mes!');
    }
  });
}

}
