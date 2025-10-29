import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-olap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './olap.component.html',
  styleUrls: ['./olap.component.css']
})
export class OlapComponent implements AfterViewInit, OnDestroy {
  // KPI usados en el template (resuelve TS2339)
  kpis = [
    { title: 'Ventas', value: '1,234', change: 5.4, color: '#4caf50', icon: 'bi bi-cart' },
    { title: 'Clientes', value: '567', change: -2.1, color: '#2196f3', icon: 'bi bi-people' },
    { title: 'Ingresos', value: '$12,345', change: 3.2, color: '#ff9800', icon: 'bi bi-currency-dollar' }
  ];

  @ViewChild('miCanvas') miCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  ngAfterViewInit(): void {
    const canvas = this.miCanvas?.nativeElement;
    if (!canvas) {
      console.error('Canvas no disponible en ngAfterViewInit');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener context 2D del canvas');
      return;
    }

    // Datos de ejemplo para evitar errores al crear el chart
    const data = {
      labels: ['Ene','Feb','Mar','Abr','May'],
      datasets: [{
        label: 'Ventas',
        data: [120, 150, 100, 170, 190],
        backgroundColor: 'rgba(54,162,235,0.5)'
      }]
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data,
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
