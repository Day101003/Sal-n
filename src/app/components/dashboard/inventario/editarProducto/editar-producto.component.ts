import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  producto = {
    nombre: 'Removedor de esmalte',
    unidad: 'ml',
    stock: 25,
    minimo: 5,
    costo: 1200,
    estado: 'Activo',
    categoria: 'Tratamientos'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  actualizarProducto() {
    console.log('🟡 Producto actualizado:', this.producto);
    alert(`Producto "${this.producto.nombre}" actualizado correctamente ✅`);
    this.router.navigate(['/dashboard/inventario']);
  }
 
}
