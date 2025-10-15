import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var Swiper: any; // 
declare var AOS: any; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
  
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, once: true });
    }

    
    setTimeout(() => {
      if (typeof Swiper !== 'undefined') {
        new Swiper('.works-swiper', {
          loop: true,
          slidesPerView: 3,
          spaceBetween: 20,
          autoplay: { delay: 3000, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
          breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }
        });
      } else {
        console.warn('Swiper no está definido. Verifica el script en angular.json');
      }
    }, 500); 
  }
}
