import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  searchQuery = '';
  usuario: any = null;
  private routerSubscription?: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuario();
    
    // Recargar usuario cuando se navega a /dashboard/perfil
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.includes('/dashboard/perfil')) {
          this.cargarUsuario();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  cargarUsuario(): void {
    this.auth.getCurrentUser().subscribe({
      next: (data) => {
        this.usuario = data;
        console.log('Usuario cargado en dashboard:', data);
      },
      error: (err) => {
        console.error('Error cargar usuario en dashboard:', err);
        // fallback: obtener nombre del token si falla el endpoint
        this.usuario = {
          nombre: this.auth.getUserName() || 'Usuario',
          rutaImg: null
        };
      }
    });
  }

  onSearch(): void {
    console.log('Buscando:', this.searchQuery);
    // implementar lógica de búsqueda si es necesario
  }
}
