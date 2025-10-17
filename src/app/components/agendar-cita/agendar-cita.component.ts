import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {
  pasoActual = 1;

  cita = {
    nombre: '',
    telefono: '',
    servicio: '',
    correo: '',
    fecha: '',
    hora: ''
  };

  horasOcupadas = ['10:00', '13:30', '15:00'];
  horas = ['09:00', '10:00', '11:00', '12:00', '13:30', '15:00', '16:30'];

  diasMes = Array.from({ length: 30 }, (_, i) => ({
    dia: i + 1,
    fecha: `2025-10-${(i + 1).toString().padStart(2, '0')}`,
    ocupado: Math.random() < 0.3
  }));

  cambiarPaso(paso: number) {
    this.pasoActual = paso;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  seleccionarDia(dia: any) {
    if (!dia.ocupado) {
      this.cita.fecha = dia.fecha;
    }
  }

  seleccionarHora(hora: string) {
    if (this.esHoraDisponible(hora)) {
      this.cita.hora = hora;
    }
  }

  esHoraDisponible(hora: string): boolean {
    return !this.horasOcupadas.includes(hora);
  }

  confirmarCita() {
    alert(`Cita confirmada para ${this.cita.nombre} el ${this.cita.fecha} a las ${this.cita.hora}`);
  }
}
