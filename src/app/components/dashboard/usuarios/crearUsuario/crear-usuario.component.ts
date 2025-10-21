import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  usuario = {
    nombre: '',
    correo: '',
    rol: '',
    estado: 'Activo'
  };

  constructor(private router: Router) {}

  guardarUsuario() {
    alert(`✅ Usuario ${this.usuario.nombre} creado exitosamente`);
    this.router.navigate(['/dashboard/usuarios']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/usuarios']);
  }
}
