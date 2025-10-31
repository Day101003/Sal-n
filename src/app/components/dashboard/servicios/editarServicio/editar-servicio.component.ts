import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css'],
})
export class EditarServicioComponent implements OnInit {
  servicio = {
    idServicio: 0,
    nombre: '',
    descripcion: '',
    costo: 0,
    duracionEstimada: '',
    estado: 1,
    idCategoria: 0
  };

  categorias: any[] = [];
  cargando = false;
  private apiUrl = 'http://localhost:5229/api/services';
  private categoriasUrl = 'http://localhost:5229/api/categories';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarServicio(parseInt(id));
    }
  }

  cargarCategorias(): void {
    this.http.get<any[]>(this.categoriasUrl).subscribe({
      next: (data) => {
        this.categorias = data.filter(c => c.estado === 1);
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  cargarServicio(id: number): void {
    this.cargando = true;
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.servicio = {
          idServicio: data.idServicio,
          nombre: data.nombre,
          descripcion: data.descripcion,
          costo: data.costo,
          duracionEstimada: data.duracionEstimada,
          estado: data.estado,
          idCategoria: data.idCategoria
        };
        this.cargando = false;
        console.log('Servicio cargado:', this.servicio);
      },
      error: (err) => {
        console.error('Error al cargar servicio:', err);
        alert('Error al cargar servicio.');
        this.cargando = false;
        this.router.navigate(['/dashboard/servicios']);
      }
    });
  }

  guardarServicio(): void {
    if (!this.servicio.nombre.trim()) {
      alert('Por favor ingresa un nombre para el servicio.');
      return;
    }

    if (!this.servicio.idCategoria || this.servicio.idCategoria === 0) {
      alert('Por favor selecciona una categoría.');
      return;
    }

    const servicioActualizado = {
      IdServicio: this.servicio.idServicio,
      Nombre: this.servicio.nombre,
      Descripcion: this.servicio.descripcion,
      Costo: this.servicio.costo,
      DuracionEstimada: this.servicio.duracionEstimada,
      Estado: this.servicio.estado,
      IdCategoria: this.servicio.idCategoria
    };

    this.http.put(`${this.apiUrl}/${this.servicio.idServicio}`, servicioActualizado).subscribe({
      next: () => {
        alert('✅ Servicio actualizado exitosamente');
        this.router.navigate(['/dashboard/servicios']);
      },
      error: (err) => {
        console.error('Error al actualizar servicio:', err);
        alert('Error al actualizar servicio.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/servicios']);
  }
}
