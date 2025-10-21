import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  correo = '';
  contrasena = '';
  confirmar = '';

  constructor(private router: Router) {}

  registrar() {
    if (this.contrasena !== this.confirmar) {
      alert('❌ Las contraseñas no coinciden.');
      return;
    }

    // Simulación de registro exitoso
    alert(`✨ Bienvenida ${this.nombre}, tu cuenta fue creada correctamente.`);
    this.router.navigate(['/login']);
  }

  irAlLogin() {
    this.router.navigate(['/login']);
  }
}
