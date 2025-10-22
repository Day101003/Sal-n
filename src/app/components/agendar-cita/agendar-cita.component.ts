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

  diasSemana = ['L', 'K', 'M', 'J', 'V', 'S', 'D'];

  // Estado del calendario
  fechaActual = new Date();
  mesActual = this.fechaActual.getMonth();
  anioActual = this.fechaActual.getFullYear();
  nombreMes = this.fechaActual.toLocaleString('es-ES', { month: 'long' }).toUpperCase();

  diasMes: any[] = [];

  constructor() {
    this.generarCalendario(this.mesActual, this.anioActual);
  }

  generarCalendario(mes: number, anio: number) {
    const primerDia = new Date(anio, mes, 1).getDay();
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();

    this.nombreMes = new Date(anio, mes).toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    this.anioActual = anio;

    const dias: any[] = [];

    // Agregar espacios vacíos antes del primer día
    const espacios = primerDia === 0 ? 6 : primerDia - 1;
    for (let i = 0; i < espacios; i++) {
      dias.push({ dia: '', ocupado: true });
    }

    // Agregar días del mes
    for (let d = 1; d <= diasEnMes; d++) {
      dias.push({
        dia: d,
        fecha: `${anio}-${(mes + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`,
        ocupado: Math.random() < 0.3
      });
    }

    this.diasMes = dias;
  }

  mesAnterior() {
    if (this.mesActual === 0) {
      this.mesActual = 11;
      this.anioActual--;
    } else {
      this.mesActual--;
    }
    this.generarCalendario(this.mesActual, this.anioActual);
  }

  mesSiguiente() {
    if (this.mesActual === 11) {
      this.mesActual = 0;
      this.anioActual++;
    } else {
      this.mesActual++;
    }
    this.generarCalendario(this.mesActual, this.anioActual);
  }

  cambiarPaso(paso: number) {
    this.pasoActual = paso;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  seleccionarDia(dia: any) {
    if (!dia.ocupado && dia.dia !== '') {
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
    alert(`✅ Cita confirmada para ${this.cita.nombre} el ${this.cita.fecha} a las ${this.cita.hora}`);
  }
}
