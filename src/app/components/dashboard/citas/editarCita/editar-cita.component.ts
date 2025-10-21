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
  cita = {
    cliente: 'María López',
    servicio: 'Manicure Gel',
    fecha: '2025-10-20',
    hora: '10:00',
    estado: 'Confirmada'
  };

  constructor(private router: Router, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('✏️ Editando cita ID:', id);
  }

  guardarCita() {
    alert(`✅ Cita actualizada para ${this.cita.cliente}`);
    this.router.navigate(['/dashboard/citas']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/citas']);
  }
}
