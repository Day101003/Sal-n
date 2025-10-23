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
    { id_categoria: 1, nombre: 'Uñas Acrílicas', descripcion: 'Extensiones y refuerzo con acrílico', estado: 1 },
    { id_categoria: 2, nombre: 'Manicure', descripcion: 'Cuidado básico y esmaltado de uñas', estado: 1 },
    { id_categoria: 3, nombre: 'Pedicure', descripcion: 'Tratamiento y estética para pies', estado: 0 },
    { id_categoria: 4, nombre: 'Diseños Personalizados', descripcion: 'Decoración artística exclusiva', estado: 1 }
  ];

  eliminarCategoria(categoria: any) {
    if (confirm(`¿Deseás eliminar la categoría "${categoria.nombre}"?`)) {
      this.categorias = this.categorias.filter(item => item !== categoria);
      alert('✅ Categoría eliminada correctamente');
    }
  }

  cambiarEstado(categoria: any) {
    categoria.estado = categoria.estado === 1 ? 0 : 1;
  }
}
