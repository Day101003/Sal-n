import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resenas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reseñas.component.html',
  styleUrls: ['./reseñas.component.css']
})
export class ResenasComponent {
  resenas = [
    { nombre: 'Elpelucas Sape', comentario: 'Estuve un año con ellos y no aprendí mucho, clases reducidas y ejercicios muy fáciles.', calificacion: 2, fecha: new Date('2024-10-01') },
    { nombre: 'Sofía Ramírez', comentario: 'Excelente academia, profesores muy dedicados.', calificacion: 5, fecha: new Date('2024-08-20') },
    { nombre: 'Carlos López', comentario: 'Buen ambiente de aprendizaje, aunque podrían mejorar los horarios.', calificacion: 4, fecha: new Date('2024-09-02') },
    { nombre: 'Valeria Gómez', comentario: 'Clases muy interactivas y profes súper atentos. ¡Recomendado!', calificacion: 5, fecha: new Date('2024-10-12') }
  ];

  nuevaResena = { nombre: '', comentario: '', calificacion: 0 };

  get promedio() {
    const total = this.resenas.reduce((acc, r) => acc + r.calificacion, 0);
    return (total / this.resenas.length).toFixed(1);
  }

  get promedioRedondeado() {
    return Math.round(+this.promedio);
  }

  get conteoEstrellas() {
    const conteo = [0, 0, 0, 0, 0];
    this.resenas.forEach(r => conteo[r.calificacion - 1]++);
    return conteo.reverse();
  }

  agregarResena() {
    if (!this.nuevaResena.nombre || !this.nuevaResena.comentario || this.nuevaResena.calificacion === 0) {
      alert('Por favor, completá todos los campos y seleccioná una calificación ⭐');
      return;
    }

    this.resenas.unshift({
      ...this.nuevaResena,
      fecha: new Date()
    });
    this.nuevaResena = { nombre: '', comentario: '', calificacion: 0 };
    alert('¡Gracias por tu reseña! ❤️');
  }

  getStars(num: number) {
    return Array(num).fill(0);
  }
}
