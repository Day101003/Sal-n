import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent {
  categoria = {
    nombre: '',
    descripcion: '',
    estado: 1
  };

  constructor(private router: Router) {}

  guardarCategoria() {
    if (this.categoria.nombre.trim()) {
      alert(`✅ Categoría "${this.categoria.nombre}" creada correctamente`);
      this.router.navigate(['/dashboard/categorias']);
    } else {
      alert('⚠️ El nombre de la categoría es obligatorio');
    }
  }

  cancelar() {
    this.router.navigate(['/dashboard/categorias']);
  }
}
