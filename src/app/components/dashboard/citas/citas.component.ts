import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  citas = [
    { fecha_hora: new Date('2025-10-18T10:30:00'), usuario: 'María Gómez', servicio: 'Manicure Gel', estado: 'Pendiente' },
    { fecha_hora: new Date('2025-10-18T13:00:00'), usuario: 'Ana López', servicio: 'Pedicure Spa', estado: 'Confirmada' },
    { fecha_hora: new Date('2025-10-19T09:00:00'), usuario: 'Laura Torres', servicio: 'Soft Gel', estado: 'Cancelada' },
  ];

  nuevaCita() {
    alert('🟢 Crear nueva cita (función pendiente)');
  }

  confirmarCita(c: any) {
    c.estado = 'Confirmada';
    alert(`✅ Cita confirmada para ${c.usuario} el ${c.fecha_hora}`);
  }

  editarCita(c: any) {
    alert(`✏️ Editando cita de ${c.usuario}`);
  }

  cancelarCita(c: any) {
    const confirmar = confirm(`❌ ¿Cancelar la cita de ${c.usuario}?`);
    if (confirmar) {
      c.estado = 'Cancelada';
    }
  }
}
