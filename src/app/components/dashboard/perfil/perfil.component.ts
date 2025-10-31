import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.cargando = true;
    this.auth.getCurrentUser().subscribe({
      next: (data) => {
        this.usuario = data;
        this.cargando = false;
        console.log('Perfil cargado:', data);
        console.log('Tipo de usuario:', data.tipo);
        console.log('Tipo de dato tipo:', typeof data.tipo);
        console.log('Comparación tipo === "1":', data.tipo === '1');
        console.log('Comparación tipo === 1:', data.tipo === 1);
      },
      error: (err) => {
        this.error = 'Error al cargar perfil.';
        this.cargando = false;
        console.error('Error cargar perfil:', err);
      }
    });
  }

  // Método helper para verificar si es admin
  esAdmin(): boolean {
    return this.usuario?.tipo === '1' || this.usuario?.tipo === 1;
  }
}
