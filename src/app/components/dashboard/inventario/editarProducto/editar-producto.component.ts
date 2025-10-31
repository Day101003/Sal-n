import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto = {
    idProducto: 0,
    nombre: '',
    cantidad: 0,
    costo: 0,
    estado: 1
  };

  cargando = false;
  private apiUrl = 'http://localhost:5229/api/products';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarProducto(parseInt(id));
    }
  }

  cargarProducto(id: number): void {
    this.cargando = true;
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.producto = {
          idProducto: data.idProducto,
          nombre: data.nombre,
          cantidad: data.cantidad,
          costo: data.costo,
          estado: data.estado
        };
        this.cargando = false;
        console.log('Producto cargado:', this.producto);
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
        alert('Error al cargar producto.');
        this.cargando = false;
        this.router.navigate(['/dashboard/inventario']);
      }
    });
  }

  guardarProducto(): void {
    if (!this.producto.nombre.trim()) {
      alert('Por favor ingresa un nombre para el producto.');
      return;
    }

    if (this.producto.cantidad < 0) {
      alert('La cantidad no puede ser negativa.');
      return;
    }

    const productoActualizado = {
      IdProducto: this.producto.idProducto,
      Nombre: this.producto.nombre,
      Cantidad: this.producto.cantidad,
      Costo: this.producto.costo,
      Estado: this.producto.estado
    };

    this.http.put(`${this.apiUrl}/${this.producto.idProducto}`, productoActualizado).subscribe({
      next: () => {
        alert('✅ Producto actualizado exitosamente');
        this.router.navigate(['/dashboard/inventario']);
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
        alert('Error al actualizar producto.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/inventario']);
  }
}
