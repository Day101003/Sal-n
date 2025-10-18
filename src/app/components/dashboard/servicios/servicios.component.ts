import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterModule], // 👈 Esto es lo importante
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  servicios = [
    { nombre: 'Manicure Gel', categoria: 'Manicure', precio: 8000 },
    { nombre: 'Pedicure Spa', categoria: 'Pedicure', precio: 9000 }
  ];

  eliminarServicio(servicio: any) {
    if (confirm(`¿Desea eliminar el servicio "${servicio.nombre}"?`)) {
      this.servicios = this.servicios.filter(s => s !== servicio);
    }
  }
}
