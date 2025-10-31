import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: any[] = [];
  categorias: any[] = [];
  private apiUrl = 'http://localhost:5229/api/services';
  private categoriasUrl = 'http://localhost:5229/api/categories';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarServicios();
  }

  cargarCategorias(): void {
    this.http.get<any[]>(this.categoriasUrl).subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  cargarServicios(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.servicios = data;
        console.log('Servicios cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        alert('Error al cargar servicios.');
      }
    });
  }

  obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias.find(c => c.idCategoria === idCategoria);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  eliminarServicio(servicio: any): void {
    if (confirm(`¿Desea eliminar el servicio "${servicio.nombre}"?`)) {
      this.http.delete(`${this.apiUrl}/${servicio.idServicio}`).subscribe({
        next: () => {
          alert('✅ Servicio eliminado correctamente');
          this.cargarServicios(); // recargar lista
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar servicio.');
        }
      });
    }
  }

  cambiarEstado(servicio: any): void {
    const nuevoEstado = servicio.estado === 1 ? 0 : 1;
    
    const servicioActualizado = {
      ...servicio,
      estado: nuevoEstado
    };

    this.http.put(`${this.apiUrl}/${servicio.idServicio}`, servicioActualizado).subscribe({
      next: () => {
        servicio.estado = nuevoEstado;
        console.log('Estado actualizado');
      },
      error: (err) => {
        console.error('Error al cambiar estado:', err);
        alert('Error al cambiar estado.');
      }
    });
  }
}
