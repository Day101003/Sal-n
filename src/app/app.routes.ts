import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'agendar-cita',
    loadComponent: () =>
      import('./components/agendar-cita/agendar-cita.component').then(
        (m) => m.AgendarCitaComponent
      ),
  },
  { path: '**', redirectTo: '' }
];
