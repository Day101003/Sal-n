import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  private apiUrl = 'http://localhost:5229/api/categories';

  constructor(private router: Router, private http: HttpClient) {}

  guardarCategoria(): void {
    if (!this.categoria.nombre.trim()) {
      alert('Por favor ingresa un nombre para la categoría.');
      return;
    }

    const nuevaCategoria = {
      Nombre: this.categoria.nombre,
      Descripcion: this.categoria.descripcion,
      Estado: this.categoria.estado
    };

    this.http.post(this.apiUrl, nuevaCategoria).subscribe({
      next: () => {
        alert('✅ Categoría creada exitosamente');
        this.router.navigate(['/dashboard/categorias']);
      },
      error: (err) => {
        console.error('Error al crear categoría:', err);
        alert('Error al crear categoría.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/categorias']);
  }
}
