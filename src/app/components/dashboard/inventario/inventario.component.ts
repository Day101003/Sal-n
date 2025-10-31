import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  private apiUrl = 'http://localhost:5229/api/products';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.productos = data.map(p => ({
          ...p,
          stock: p.cantidad, // mapear Cantidad a stock para el HTML
          minimo: 10 // puedes ajustar esto según necesites
        }));
        console.log('Productos cargados:', this.productos);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        alert('Error al cargar productos.');
      }
    });
  }

  eliminarProducto(producto: any): void {
    if (confirm(`¿Desea eliminar el producto "${producto.nombre}"?`)) {
      this.http.delete(`${this.apiUrl}/${producto.idProducto}`).subscribe({
        next: () => {
          alert('✅ Producto eliminado correctamente');
          this.cargarProductos(); // recargar lista
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar producto.');
        }
      });
    }
  }

  exportarPDF(): void {
    alert('Función de exportar PDF - Por implementar');
    // Aquí puedes integrar jsPDF o similar
  }
}
