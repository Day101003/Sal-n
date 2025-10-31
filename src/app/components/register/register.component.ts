import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  registrar(): void {
    this.errorMessage = '';
    if (this.contrasena !== this.confirmar) {
      alert('❌ Las contraseñas no coinciden.');
      return;
    }

    this.auth.register({ nombre: this.nombre, correo: this.correo, contrasena: this.contrasena })
      .subscribe({
        next: (body) => {
          const token = body?.token || body?.access_token;
          if (token) {
            this.auth.saveToken(token);
            console.log('Registro exitoso — token:', token.slice(0,8) + '…(masked)');
            this.router.navigate(['/dashboard']);
          } else {
            // no hay token -> registro exitoso, redirigir a login
            console.log('Usuario registrado. Redirigiendo a login...');
            alert('✅ Registro exitoso. Inicia sesión para continuar.');
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.error('Register error completo:', err);
          console.error('Response body:', err?.error);
          this.errorMessage = err?.status === 400 ? (err?.error?.message || 'Datos inválidos.') : 'Error del servidor.';
        }
      });
  }

  irAlLogin(): void {
    this.router.navigate(['/login']);
  }
}
