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
  telefono: '',
  correo: '',
  fecha_registro: '',
  clave: '',
  ruta_img: '',
  preferencias: ''
};


  constructor(private router: Router) {}

  guardarUsuario() {
    alert(`✅ Usuario ${this.usuario.nombre} creado exitosamente`);
    this.router.navigate(['/dashboard/usuarios']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/usuarios']);
  }

  cargarImagen(event: any) {
  const archivo = event.target.files[0];
  if (archivo) {
    const lector = new FileReader();
    lector.onload = () => {
      this.usuario.ruta_img = lector.result as string; // base64
    };
    lector.readAsDataURL(archivo);
  }
}

}
