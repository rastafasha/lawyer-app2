import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-aviso',
  imports: [RouterLink],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.css'
})
export class AvisoComponent {
  user: Usuario;
  constructor(
    private authService: AuthService,
  ) {
    this.user = this.authService.getUser();
  }
}
