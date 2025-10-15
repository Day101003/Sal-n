import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // si no tienes rutas aún, lo veremos abajo

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
