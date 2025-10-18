import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css'],
})
export class EditarServicioComponent {
  esEdicion = true;

  servicio = {
    nombre: '',
    categoria: '',
    precio: 0,
  };

  constructor(private router: Router, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('🟢 Editando servicio con ID:', id);
  }

  guardarCambios() {
    alert('✅ Servicio actualizado correctamente');
    this.router.navigate(['/dashboard/servicios']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/servicios']);
  }
}
