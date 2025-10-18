import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  productos = [
    { nombre: 'Removedor de esmalte', unidad: 'ml', stock: 25, minimo: 5, costo: 1200, estado: 'Activo' },
    { nombre: 'Lima profesional', unidad: 'unid', stock: 10, minimo: 3, costo: 900, estado: 'Activo' },
    { nombre: 'Esmalte rosado', unidad: 'ml', stock: 2, minimo: 4, costo: 1500, estado: 'Bajo stock' }
  ];

  eliminarProducto(p: any) {
    const confirmar = confirm(`¿Deseás eliminar el producto "${p.nombre}"?`);
    if (confirmar) {
      this.productos = this.productos.filter(item => item !== p);
      alert('Producto eliminado correctamente ✅');
    }
  }
}
