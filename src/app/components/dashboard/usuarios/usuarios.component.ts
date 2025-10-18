import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios = [
    { nombre: 'Jessica Monge', rol: 'Administrador', correo: 'jessica@nailsstudio.com', estado: 'Activo' },
    { nombre: 'María Gómez', rol: 'Recepcionista', correo: 'maria@nailsstudio.com', estado: 'Activo' },
    { nombre: 'Ana López', rol: 'Manicurista', correo: 'ana@nailsstudio.com', estado: 'Inactivo' },
  ];

  nuevoUsuario() {
    alert('🟢 Agregar nuevo usuario (función pendiente)');
  }

  cambiarEstado(u: any) {
    u.estado = u.estado === 'Activo' ? 'Inactivo' : 'Activo';
  }

  editarUsuario(u: any) {
    alert(`✏️ Editando usuario: ${u.nombre}`);
  }

  eliminarUsuario(u: any) {
    const confirmar = confirm(`❌ ¿Seguro que deseas eliminar a ${u.nombre}?`);
    if (confirmar) {
      this.usuarios = this.usuarios.filter(user => user !== u);
    }
  }
}
