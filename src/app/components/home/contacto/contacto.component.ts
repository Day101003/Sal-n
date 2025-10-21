import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  mensaje = {
    nombre: '',
    correo: '',
    texto: ''
  };

  whatsappLink = '';

  enviarMensaje() {
    const nombre = encodeURIComponent(this.mensaje.nombre);
    const texto = encodeURIComponent(this.mensaje.texto);
    const correo = encodeURIComponent(this.mensaje.correo);

    this.whatsappLink = `https://wa.me/50688889999?text=Hola,%20soy%20${nombre},%20mi%20correo%20es%20${correo}.%20${texto}`;
    window.open(this.whatsappLink, '_blank');
  }
}
