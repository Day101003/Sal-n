import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  cargando = true;
  error = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // debug: verificar claims del token
    const token = this.auth.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Claims del token:', decoded);
      console.log('IdUsuario claim:', decoded.IdUsuario);
    }
    
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.auth.getCurrentUser().subscribe({
      next: (data) => {
        this.usuario = data;
        this.cargando = false;
        console.log('Perfil cargado:', data);
      },
      error: (err) => {
        console.error('Error cargar perfil completo:', err);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
        console.error('Error body:', err.error);
        console.error('Errors object:', err.error?.errors); // ver validaciones específicas
        
        this.error = err.status === 401 
          ? 'No autorizado. Por favor inicia sesión nuevamente.' 
          : err.status === 400
          ? 'Datos de token inválidos. Por favor inicia sesión nuevamente.'
          : 'Error al cargar perfil.';
        this.cargando = false;
      }
    });
  }
}
