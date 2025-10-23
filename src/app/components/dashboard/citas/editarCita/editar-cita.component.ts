import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css']
})
export class EditarCitaComponent {
 

  empleados = [
    { id: 10, nombre: 'Dayanna' },
    { id: 11, nombre: 'Alejandra' },
    { id: 12, nombre: 'Junior' }
  ];

  servicios = [
    { id: 100, nombre: 'Manicure Gel' },
    { id: 101, nombre: 'Pedicure Spa' },
    { id: 102, nombre: 'Soft Gel' },
    { id: 103, nombre: 'Diseño Personalizado' }
  ];

  cita = {
    id_usuario_cliente: '',
    id_usuario_empleado: '',
    id_servicio: '',
    fecha_cita: '',
    hora: '',
    estado: 'Pendiente',
    observacion: ''
  };

  constructor(private router: Router) {}

  guardarCita() {
    alert(`✅ Cita agendada correctamente para ${this.cita.fecha_cita} a las ${this.cita.hora}`);
    this.router.navigate(['/dashboard/citas']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/citas']);
  }
}