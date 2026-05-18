import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profile } from '../../models/profile.model';
import { NgIf } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-aviso',
  imports: [RouterLink, NgIf, LoadingComponent, TranslateModule],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.css'
})
export class AvisoComponent {
  @Input() profile!: Profile;
  @Input() user!:  any;
  user_id!: number;
  isLoading:boolean = false;
}
