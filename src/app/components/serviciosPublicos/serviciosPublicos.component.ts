import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios-publico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './serviciosPublicos.component.html',
  styleUrls: ['./serviciosPublicos.component.css']
})
export class ServiciosPublicosComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  servicios = [
    {
      nombre: 'Manicure Gel',
      descripcion: 'Brillo duradero, resistencia y estilo impecable.',
      precio: 8000,
      imagenes: [
        'assets/img/servicios/manicure.jpg',
        'assets/img/trabajos/unas1.jpg',
        'assets/img/trabajos/unas3.jpg'
      ],
      activeIndex: 0
    },
    {
      nombre: 'Pedicure Spa',
      descripcion: 'Relajación total e hidratación profunda.',
      precio: 9000,
      imagenes: [
        'assets/img/trabajos/unas1.jpg',
        'assets/img/servicios/manicure.jpg',
        'assets/img/trabajos/unas3.jpg'
      ],
      activeIndex: 0
    },
    {
      nombre: 'Soft Gel',
      descripcion: 'Uñas ligeras, naturales y resistentes con productos premium.',
      precio: 10000,
      imagenes: [
        'assets/img/servicios/manicure.jpg',
        'assets/img/trabajos/unas1.jpg',
        'assets/img/trabajos/unas3.jpg'
      ],
      activeIndex: 0
    },
    {
      nombre: 'Diseños Personalizados',
      descripcion: 'Diseños únicos que reflejan tu estilo y personalidad.',
      precio: 12000,
      imagenes: [
        'assets/img/servicios/manicure.jpg',
        'assets/img/trabajos/unas1.jpg',
        'assets/img/trabajos/unas3.jpg'
      ],
      activeIndex: 0
    }
  ];

  private startX = 0;
  private moveX = 0;
  private isDragging = false;
  private currentService: any = null;
  private autoSlideInterval: any;

  ngOnInit() {
    // Inicia carrusel automático
    this.autoSlideInterval = setInterval(() => {
      this.servicios.forEach(s => {
        s.activeIndex = (s.activeIndex + 1) % s.imagenes.length;
      });
    }, 5000); // cada 5 s
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
  }

  agendar(servicio: any) {
    this.router.navigate(['/agendar-cita'], { state: { servicio } });
  }

  anteriorImagen(s: any) {
    s.activeIndex = (s.activeIndex - 1 + s.imagenes.length) % s.imagenes.length;
  }

  siguienteImagen(s: any) {
    s.activeIndex = (s.activeIndex + 1) % s.imagenes.length;
  }

 
  onDragStart(event: MouseEvent | TouchEvent, s: any) {
    this.isDragging = true;
    this.currentService = s;
    this.startX = this.getX(event);
    this.moveX = this.startX;
  }

  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    this.moveX = this.getX(event);
  }

  onDragEnd() {
    if (!this.isDragging || !this.currentService) return;
    const diff = this.startX - this.moveX;

    if (Math.abs(diff) > 30) { // 
      if (diff > 0) this.siguienteImagen(this.currentService);
      else this.anteriorImagen(this.currentService);
    }

    this.isDragging = false;
    this.currentService = null;
  }

  private getX(e: MouseEvent | TouchEvent): number {
    return e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  }
}
