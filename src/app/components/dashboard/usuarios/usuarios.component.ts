import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  usuarios = [
    { nombre: 'María López', rol: 'Administradora', correo: 'maria@salon.com', estado: 'Activo' },
    { nombre: 'Ana Jiménez', rol: 'Recepcionista', correo: 'ana@salon.com', estado: 'Inactivo' },
    { nombre: 'Sofía Vargas', rol: 'Manicurista', correo: 'sofia@salon.com', estado: 'Activo' }
  ];

  constructor(private router: Router) {}

  nuevoUsuario() {
    this.router.navigate(['/dashboard/usuarios/crear']);
  }

  editarUsuario(index: number) {
    this.router.navigate([`/dashboard/usuarios/editar/${index}`]);
  }

  eliminarUsuario(usuario: any) {
    const confirmacion = confirm(`¿Deseas eliminar a ${usuario.nombre}?`);
    if (confirmacion) {
      this.usuarios = this.usuarios.filter(u => u !== usuario);
      alert(`Usuario ${usuario.nombre} eliminado ✅`);
    }
  }

  cambiarEstado(usuario: any) {
    usuario.estado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';
  }
}
