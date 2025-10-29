import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo = '';
  contrasena = '';
  verContrasena = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion(): void {
    this.errorMessage = '';
    this.authService.login(this.correo, this.contrasena).subscribe({
      next: (body) => {
        const token = body?.token || body?.access_token || body?.jwt;
        if (token) {
          console.log('Login exitoso — token:', token.slice(0, 8) + '…(masked)');
          this.authService.saveToken(token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'No se recibió token del servidor.';
        }
      },
      error: (err) => {
        // mostrar info útil para depuración
        console.error('Login error', { status: err.status, statusText: err.statusText, body: err.error });
        this.errorMessage = err.status === 401 ? 'Usuario o contraseña incorrectos.' : 'Error del servidor.';
      }
    });
  }
}
