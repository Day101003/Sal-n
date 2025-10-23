import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  citas = [
    {
      id_cita: 1,
      usuario_cliente: 'María López',
      usuario_empleado: 'Day ',
      servicio: 'Manicure Gel',
      fecha_cita: new Date('2025-10-22T10:00:00'),
      estado: 'Pendiente'
    },
    {
      id_cita: 2,
      usuario_cliente: 'Sofía Vargas',
      usuario_empleado: 'Ale Jiménez',
      servicio: 'Pedicure Spa',
      fecha_cita: new Date('2025-10-23T14:00:00'),
      estado: 'Confirmada'
    },
    {
      id_cita: 3,
      usuario_cliente: 'Ana Jiménez',
      usuario_empleado: 'Ale Jiménez',
      servicio: 'Soft Gel',
      fecha_cita: new Date('2025-10-24T16:00:00'),
      estado: 'Cancelada'
    },
    {
      id_cita: 3,
      usuario_cliente: 'Antonia Jiménez',
      usuario_empleado: 'Ale Jiménez',
      servicio: 'Soft Gel',
      fecha_cita: new Date('2025-10-24T16:00:00'),
      estado: 'Cancelada'
    },
    {
      id_cita: 3,
      usuario_cliente: 'Andrea Delgado',
      usuario_empleado: 'Ale Jiménez',
      servicio: 'Soft Gel',
      fecha_cita: new Date('2025-10-24T16:00:00'),
      estado: 'Cancelada'
    }
  ];

  constructor(private router: Router) {}

  nuevaCita() {
    this.router.navigate(['/dashboard/citas/crear']);
  }

  editarCita(id: number) {
    this.router.navigate([`/dashboard/citas/editar/${id}`]);
  }

  confirmarCita(cita: any) {
    cita.estado = 'Confirmada';
    alert(`✅ Cita confirmada para ${cita.usuario_cliente}`);
  }

  cancelarCita(cita: any) {
    cita.estado = 'Cancelada';
    alert(`❌ Cita cancelada para ${cita.usuario_cliente}`);
  }
}
