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
    { fecha_hora: new Date('2025-10-22T10:00:00'), usuario: 'María López', servicio: 'Manicure Gel', estado: 'Pendiente' },
    { fecha_hora: new Date('2025-10-23T14:00:00'), usuario: 'Sofía Vargas', servicio: 'Pedicure Spa', estado: 'Confirmada' },
    { fecha_hora: new Date('2025-10-24T16:00:00'), usuario: 'Ana Jiménez', servicio: 'Soft Gel', estado: 'Cancelada' }
  ];

  constructor(private router: Router) {}

  nuevaCita() {
    this.router.navigate(['/dashboard/citas/crear']);
  }

  editarCita(index: number) {
    this.router.navigate([`/dashboard/citas/editar/${index}`]);
  }

  confirmarCita(cita: any) {
    cita.estado = 'Confirmada';
    alert(`✅ Cita confirmada para ${cita.usuario}`);
  }

  cancelarCita(cita: any) {
    cita.estado = 'Cancelada';
    alert(`❌ Cita cancelada para ${cita.usuario}`);
  }
}
