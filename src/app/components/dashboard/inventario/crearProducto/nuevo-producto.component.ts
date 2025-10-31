import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent {
  producto = {
    nombre: '',
    cantidad: 0,
    costo: 0,
    estado: 1
  };

  private apiUrl = 'http://localhost:5229/api/products';

  constructor(private router: Router, private http: HttpClient) {}

  guardarProducto(): void {
    if (!this.producto.nombre.trim()) {
      alert('Por favor ingresa un nombre para el producto.');
      return;
    }

    if (this.producto.cantidad < 0) {
      alert('La cantidad no puede ser negativa.');
      return;
    }

    const nuevoProducto = {
      Nombre: this.producto.nombre,
      Cantidad: this.producto.cantidad,
      Costo: this.producto.costo,
      Estado: this.producto.estado
    };

    this.http.post(this.apiUrl, nuevoProducto).subscribe({
      next: () => {
        alert('✅ Producto agregado exitosamente');
        this.router.navigate(['/dashboard/inventario']);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
        alert('Error al crear producto.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/inventario']);
  }
}