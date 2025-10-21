import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  usuario = {
    nombre: 'Day Admin',
    rol: 'Administrador',
    correo: 'dayadmin@nailsstudio.com',
    telefono: '+506 8888-9999'
  };

  guardarCambios() {
    console.log('Datos actualizados:', this.usuario);
    // Aquí podrías llamar a un servicio para guardar los datos en el backend
  }

  cancelar() {
    // Redirigir o limpiar el formulario si lo deseas
    console.log('Edición cancelada');
  }
}
