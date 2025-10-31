import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  private apiUrl = 'http://localhost:5229/api/users';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        // Filtrar solo administradores (tipo "1")
        this.usuarios = data.filter(u => u.tipo === '1' || u.tipo === 1);
        console.log('Usuarios administradores:', this.usuarios);
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        alert('Error al cargar usuarios.');
      }
    });
  }

  nuevoUsuario() {
    this.router.navigate(['/dashboard/usuarios/crear']);
  }

  editarUsuario(usuario: any) {
    this.router.navigate([`/dashboard/usuarios/editar/${usuario.idUsuario}`]);
  }

  eliminarUsuario(usuario: any) {
    const confirmacion = confirm(`¿Deseas eliminar a ${usuario.nombre}?`);
    if (confirmacion) {
      this.http.delete(`${this.apiUrl}/${usuario.idUsuario}`).subscribe({
        next: () => {
          alert(`Usuario ${usuario.nombre} eliminado ✅`);
          this.cargarUsuarios(); // recargar lista
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar usuario.');
        }
      });
    }
  }
}
