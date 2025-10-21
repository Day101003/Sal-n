import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent {
  cita = {
    cliente: '',
    servicio: '',
    fecha: '',
    hora: '',
    estado: 'Pendiente'
  };

  constructor(private router: Router) {}

  guardarCita() {
    alert(`✅ Cita agendada para ${this.cita.cliente} el ${this.cita.fecha} a las ${this.cita.hora}`);
    this.router.navigate(['/dashboard/citas']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/citas']);
  }
}
