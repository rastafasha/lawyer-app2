import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Profile } from '../../models/profile.model';
import { CommonModule, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { AuthService } from '../../services/auth.service';
import { Speciality } from '../../models/speciality.model';

@Component({
    selector: 'app-fichaprofile',
    imports: [
        CommonModule,
        ImagenPipe,
        LoadingComponent,
        TranslateModule,
        NgFor,
    ],
    templateUrl: './fichaprofile.component.html',
    styleUrls: ['./fichaprofile.component.scss']
})

export class FichaprofileComponent implements OnChanges {
    @Input() loadingTitle!: string;
    @Input() isLoading!: boolean;
    @Input() profile!: Profile;
    @Input() user!:  Usuario;
    @Input() speciality!: Speciality;
    @Input() redessociales: any;

    private authService = inject(AuthService);
    constructor () {}

    ngOnInit() {
        this.redessociales;
        this.profile;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['profile']) {
            // console.log('Profile input changed:', changes['profile'].currentValue);
        }
        if (changes['user']) {
            // console.log('User input changed:', changes['user'].currentValue);
        }
        if (changes['redessociales']) {
            // console.log('Redessociales input changed:', changes['redessociales'].currentValue);
        }
    }

    logout() {
        this.authService.logout();
    }
}
