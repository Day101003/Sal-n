import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    unidad: '',
    stock: 0,
    minimo: 0,
    costo: 0,
    estado: 'Activo',
    categoria: 'Manicure'
  };

  constructor(private router: Router) {}

  guardarProducto() {
    console.log('🟢 Producto guardado:', this.producto);
    alert(`Producto "${this.producto.nombre}" guardado correctamente ✅`);
    this.router.navigate(['/dashboard/inventario']);
  }
  cancelar() {
    this.router.navigate(['/dashboard/inventario']);
  }
}
