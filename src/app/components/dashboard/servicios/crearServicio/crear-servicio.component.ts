import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {
  servicio = {
    nombre: '',
    descripcion: '',
    costo: 0,
    duracionEstimada: '',
    estado: 1,
    idCategoria: 0
  };

  categorias: any[] = [];
  private apiUrl = 'http://localhost:5229/api/services';
  private categoriasUrl = 'http://localhost:5229/api/categories';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.http.get<any[]>(this.categoriasUrl).subscribe({
      next: (data) => {
        // Filtrar solo categorías activas
        this.categorias = data.filter(c => c.estado === 1);
        console.log('Categorías cargadas:', this.categorias);
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        alert('Error al cargar categorías.');
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

    const nuevoServicio = {
      Nombre: this.servicio.nombre,
      Descripcion: this.servicio.descripcion,
      Costo: this.servicio.costo,
      DuracionEstimada: this.servicio.duracionEstimada,
      Estado: this.servicio.estado,
      IdCategoria: this.servicio.idCategoria
    };

    this.http.post(this.apiUrl, nuevoServicio).subscribe({
      next: () => {
        alert('✅ Servicio creado exitosamente');
        this.router.navigate(['/dashboard/servicios']);
      },
      error: (err) => {
        console.error('Error al crear servicio:', err);
        alert('Error al crear servicio.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/servicios']);
  }
}
