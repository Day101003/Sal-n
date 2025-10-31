import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
  private apiUrl = 'http://localhost:5229/api/categories';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.categorias = data;
        console.log('Categorías cargadas:', data);
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        alert('Error al cargar categorías.');
      }
    });
  }

  eliminarCategoria(categoria: any): void {
    if (confirm(`¿Deseás eliminar la categoría "${categoria.nombre}"?`)) {
      this.http.delete(`${this.apiUrl}/${categoria.idCategoria}`).subscribe({
        next: () => {
          alert('✅ Categoría eliminada correctamente');
          this.cargarCategorias(); // recargar lista
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar categoría.');
        }
      });
    }
  }

  cambiarEstado(categoria: any): void {
    const nuevoEstado = categoria.estado === 1 ? 0 : 1;
    
    const categoriaActualizada = {
      idCategoria: categoria.idCategoria,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      estado: nuevoEstado
    };

    this.http.put(`${this.apiUrl}/${categoria.idCategoria}`, categoriaActualizada).subscribe({
      next: () => {
        categoria.estado = nuevoEstado;
        console.log('Estado actualizado');
      },
      error: (err) => {
        console.error('Error al cambiar estado:', err);
        alert('Error al cambiar estado.');
      }
    });
  }
}
