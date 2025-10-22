import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent {
  esEdicion = false;

  servicio = {
    nombre: '',
    descripcion: '',
    costo: 0,
    duracion_estimada: '',
    estado: 1,
    id_categoria: ''
  };

  categorias = [
    { id: 1, nombre: 'Manicure' },
    { id: 2, nombre: 'Pedicure' },
    { id: 3, nombre: 'Uñas Acrílicas' },
    { id: 4, nombre: 'Spa' }
  ];

  constructor(private router: Router) {}

  guardarCambios() {
    alert(`💅 Servicio "${this.servicio.nombre}" creado correctamente.`);
    this.router.navigate(['/dashboard/servicios']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/servicios']);
  }
}
