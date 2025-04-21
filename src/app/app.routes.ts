import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HotelDetailComponent } from './pages/hotel-detail/hotel-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'hotels', component: HomeComponent },
  { path: 'hotel/:id', component: HotelDetailComponent },
  {
    path: '',
    redirectTo: '/hotels',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
