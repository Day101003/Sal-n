import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  categorias = [
    { nombre: 'Uñas Acrílicas' },
    { nombre: 'Manicure' },
    { nombre: 'Pedicure' },
    { nombre: 'Diseños Personalizados' }
  ];

  eliminarCategoria(categoria: any) {
    const confirmar = confirm(`¿Deseás eliminar la categoría "${categoria.nombre}"?`);
    if (confirmar) {
      this.categorias = this.categorias.filter((item) => item !== categoria);
      alert('✅ Categoría eliminada correctamente');
    }
  }
}
