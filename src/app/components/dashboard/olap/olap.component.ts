import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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
  charts: Chart[] = []; 

  ngAfterViewInit() {
    this.graficarVentasMensuales();
    this.graficarServicios();
    this.graficarPagos();
    this.graficarClientes();
    this.graficarServiciosPopulares();
    this.graficarCanales();
  }
  kpis = [
  { title: 'Ventas Totales', value: '₡1.44M', change: 10, color: '#448a5eff', icon: 'bi bi-cart-check' },
  { title: 'Margen ₡', value: '₡155,800', change: 20, color: '#ddb918ff', icon: 'bi bi-wallet2' },
  { title: 'Clientes Nuevos', value: '43', change: 30, color: '#3c91b8ff', icon: 'bi bi-people-fill' },
  { title: 'Pedidos Recibidos', value: '15.5K', change: -10, color: '#be3232ff', icon: 'bi bi-bag-check' }
];


  ngOnDestroy() {
    // 💣 Destruye todos los gráficos al salir del componente
    this.charts.forEach(chart => chart.destroy());
  }

  graficarVentasMensuales() {
    const chart = new Chart('chartVentasMensuales', {
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
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
    this.charts.push(chart);
  }

  graficarServicios() {
    const chart = new Chart('chartServicios', {
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
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
    this.charts.push(chart);
  }

  graficarPagos() {
    const chart = new Chart('chartPagos', {
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
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
    this.charts.push(chart);
  }

  graficarClientes() {
    const chart = new Chart('chartClientes', {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
        datasets: [{
          label: 'Clientes Nuevos',
          data: [20, 25, 30, 28, 35, 40, 38, 48],
          borderColor: '#f0ba55',
          backgroundColor: 'rgba(240, 186, 85, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
    this.charts.push(chart);
  }

  graficarServiciosPopulares() {
    const chart = new Chart('chartPopulares', {
      type: 'bar',
      data: {
        labels: ['Soft Gel', 'Manicure', 'Pedicure', 'Acrílicas', 'Diseños'],
        datasets: [{
          label: 'Cantidad de Servicios',
          data: [120, 95, 80, 60, 45],
          backgroundColor: ['#f0ba55', '#d28c65', '#c4775d', '#ad5a4f', '#50280d']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
    this.charts.push(chart);
  }

  graficarCanales() {
    const chart = new Chart('chartCanales', {
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
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
    this.charts.push(chart);
  }
}
