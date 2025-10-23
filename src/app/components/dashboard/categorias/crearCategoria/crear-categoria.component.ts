import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent {
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
