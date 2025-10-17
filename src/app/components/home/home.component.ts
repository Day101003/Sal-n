import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare const AOS: any;
declare const Swiper: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Esperar un poco para asegurarse de que todo el DOM esté renderizado
    setTimeout(() => {
      // ✅ Inicializar AOS
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: true
        });
      }

      // ✅ Inicializar Swiper (carrusel de trabajos)
      if (typeof Swiper !== 'undefined') {
        new Swiper('.works-swiper', {
          slidesPerView: 3,
          spaceBetween: 20,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }
        });
      }
    }, 600); // 0.6s para que AOS no tape los elementos
  }

  irAAgendarCita(): void {
    this.router.navigate(['/agendar-cita']);
  }
}
