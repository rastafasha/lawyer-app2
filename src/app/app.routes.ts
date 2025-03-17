import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchComponent } from './pages/search/search.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/profile/settings/settings.component';
import { EditComponent } from './pages/profile/edit/edit.component';
import { DocumentsComponent } from './pages/profile/documents/documents.component';
import { FilesComponent } from './pages/profile/documents/files/files.component';
import { PaymentComponent } from './pages/wallet/payment/payment.component';
import { OrderComponent } from './pages/wallet/order/order.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'favorites', component: FavoritesComponent},
    {path: 'search', component: SearchComponent},
    
    //user
    {path: 'profile', component: ProfileComponent},
    {path: 'profile/settings', component: SettingsComponent},
    {path: 'profile/edit', component: EditComponent},
    {path: 'profile/documents', component: DocumentsComponent},
    {path: 'profile/documents/files', component: FilesComponent},

    //wallet
    {path: 'wallet', component: WalletComponent},
    {path: 'wallet-payment', component: PaymentComponent},
    {path: 'orders', component: OrderComponent},

    {path: '**', redirectTo: '', pathMatch: 'full'},
];
