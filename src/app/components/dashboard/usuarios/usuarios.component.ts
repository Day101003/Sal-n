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
  {
    nombre: 'Junior Bell',
    telefono: '8888-1234',
    correo: 'Junior@salon.com',
    fecha_registro: new Date('2025-01-10'),
    ruta_img: 'assets/img/img-unas/JUNIOR.jpg'
  },
  {
    nombre: 'Dayanna Solano',
    telefono: '8888-5678',
    correo: 'day@salon.com',
    fecha_registro: new Date('2025-03-22'),
    ruta_img: 'assets/img/img-unas/dAY.png'
  },
  {
    nombre: 'Ale Jiménez',
    telefono: '8888-9012',
    correo: 'sofia@salon.com',
    fecha_registro: new Date('2025-05-15'),
    ruta_img: 'assets/img/img-unas/Ale.jpg'
  }
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
