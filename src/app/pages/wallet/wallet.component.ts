import { Component } from '@angular/core';
import { MenuFooterComponent } from '../../shared/menu-footer/menu-footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LateralComponent } from '../../components/lateral/lateral.component';
import { BackButtnComponent } from '../../shared/backButtn/backButtn.component';

@Component({
  selector: 'app-wallet',
  imports: [
    MenuFooterComponent, HeaderComponent,
    CommonModule, RouterLink, LateralComponent,
    BackButtnComponent
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  pageTitle='Wallet';
  ngOnInit(){
    window.scrollTo(0, 0);
  }
}
