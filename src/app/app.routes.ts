import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'hotels', component: HomeComponent },
  {
    path: '',
    redirectTo: '/hotels',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];
