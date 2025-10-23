import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  exportarPDF() {
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(16);
    doc.text('Inventario de Productos', 14, 18);
    doc.setFontSize(11);
    doc.setTextColor(100);

    // Encabezados de la tabla
    const head = [['Nombre', 'Stock', 'Costo (₡)', 'Estado']];

    // Filas de la tabla
    const data = this.productos.map(p => [
      p.nombre,
      p.stock.toString(),
      p.costo.toLocaleString('es-CR'),
      p.estado
    ]);

    // Generar tabla con formato
    autoTable(doc, {
      head,
      body: data,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [240, 186, 85], // color dorado del tema
        textColor: [80, 40, 13],
        fontStyle: 'bold'
      },
      styles: {
        cellPadding: 4,
        fontSize: 10,
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [255, 250, 240]
      }
    });

    // Pie de página
    const fecha = new Date().toLocaleDateString('es-CR');
    doc.text(`Generado el ${fecha}`, 14, doc.internal.pageSize.height - 10);

    // Descargar PDF
    doc.save(`Inventario_${fecha}.pdf`);
  }
}
