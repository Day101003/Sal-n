import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  esDashboard = false;
  esAgendarCita = false;
  esLogin = false;
  esRegister = false;
  esServicios = false;
  esResenas = false;
  esContacto = false;
 cargando = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        this.esDashboard = url.startsWith('/dashboard');
        this.esAgendarCita = url.startsWith('/agendar-cita');
        this.esLogin = url.startsWith('/login');
        this.esRegister = url.startsWith('/register');
        this.esServicios = url.startsWith('/servicios');
        this.esResenas = url.startsWith('/resenas');
        this.esContacto = url.startsWith('/contacto');
      });
  }

   ngOnInit() {
   
    setTimeout(() => {
      this.cargando = false;
    }, 800);
  }

  onActivate() {
    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
    }, 400); 
  }
}
