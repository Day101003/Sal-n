import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-olap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './olap.component.html',
  styleUrls: ['./olap.component.css']
})
export class OlapComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.graficarVentasMensuales();
    this.graficarServicios();
    this.graficarPagos();
    this.graficarCanales();
  }

  graficarVentasMensuales() {
    new Chart('chartVentasMensuales', {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
        datasets: [{
          label: '₡ Ventas',
          data: [500000, 700000, 800000, 1200000, 950000, 870000, 1100000, 600000],
          backgroundColor: '#f0ba55'
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  graficarServicios() {
    new Chart('chartServicios', {
      type: 'bar',
      data: {
        labels: ['Manicure', 'Pedicure', 'Soft Gel', 'Diseños'],
        datasets: [{
          label: '₡ Ventas por servicio',
          data: [250000, 180000, 300000, 220000],
          backgroundColor: ['#e1a46e', '#d28c65', '#c4775d', '#ad5a4f']
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'y'
      }
    });
  }

  graficarPagos() {
    new Chart('chartPagos', {
      type: 'doughnut',
      data: {
        labels: ['Efectivo', 'Tarjeta', 'SINPE', 'Transferencia'],
        datasets: [{
          data: [55, 30, 10, 5],
          backgroundColor: ['#f0ba55', '#d28c65', '#50280d', '#c4775d']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  graficarCanales() {
    new Chart('chartCanales', {
      type: 'pie',
      data: {
        labels: ['En el salón', 'Online'],
        datasets: [{
          data: [75, 25],
          backgroundColor: ['#f0ba55', '#50280d']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}
