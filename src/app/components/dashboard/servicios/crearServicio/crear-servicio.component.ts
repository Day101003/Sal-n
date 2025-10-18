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
    categoria: '',
    precio: 0
  };

  constructor(private router: Router) {}

  guardarCambios() {
    alert(' Servicio creado correctamente');
    this.router.navigate(['/dashboard/servicios']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/servicios']);
  }
}
