import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  categoria = {
    idCategoria: 0,
    nombre: '',
    descripcion: '',
    estado: 1
  };

  cargando = false;
  private apiUrl = 'http://localhost:5229/api/categories';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarCategoria(parseInt(id));
    }
  }

  cargarCategoria(id: number): void {
    this.cargando = true;
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.categoria = {
          idCategoria: data.idCategoria,
          nombre: data.nombre,
          descripcion: data.descripcion,
          estado: data.estado
        };
        this.cargando = false;
        console.log('Categoría cargada:', this.categoria);
      },
      error: (err) => {
        console.error('Error al cargar categoría:', err);
        alert('Error al cargar categoría.');
        this.cargando = false;
        this.router.navigate(['/dashboard/categorias']);
      }
    });
  }

  guardarCategoria(): void {
    if (!this.categoria.nombre.trim()) {
      alert('Por favor ingresa un nombre para la categoría.');
      return;
    }

    const categoriaActualizada = {
      IdCategoria: this.categoria.idCategoria,
      Nombre: this.categoria.nombre,
      Descripcion: this.categoria.descripcion,
      Estado: this.categoria.estado
    };

    this.http.put(`${this.apiUrl}/${this.categoria.idCategoria}`, categoriaActualizada).subscribe({
      next: () => {
        alert('✅ Categoría actualizada exitosamente');
        this.router.navigate(['/dashboard/categorias']);
      },
      error: (err) => {
        console.error('Error al actualizar categoría:', err);
        alert('Error al actualizar categoría.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/categorias']);
  }
}
