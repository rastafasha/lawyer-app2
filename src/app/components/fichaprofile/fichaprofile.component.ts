import { Component, inject, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Profile } from '../../models/profile.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { LateralComponent } from '../lateral/lateral.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-fichaprofile',
    imports: [
        CommonModule,
        RouterLink,
        ImagenPipe,
        LoadingComponent,
        TranslateModule
    ],
    templateUrl: './fichaprofile.component.html',
    styleUrls: ['./fichaprofile.component.scss']
})
export class FichaprofileComponent {
    @Input() loadingTitle!: string;
    @Input() isLoading!: boolean;
    @Input() profile!: Profile;
    @Input() user!:  Usuario
    @Input() redessociales: any;

    private authService = inject(AuthService);
    constructor () {}

    logout() {
        this.authService.logout();
      }
}