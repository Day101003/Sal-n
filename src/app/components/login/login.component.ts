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
          this.authService.saveToken(token);
          console.log('Login exitoso — token:', token.slice(0,8) + '…(masked)');
          
          const tipoUsuario = this.authService.getUserType();
          console.log('Tipo de usuario:', tipoUsuario);
          console.log('Es admin?:', this.authService.isAdmin());
          
          if (this.authService.isAdmin()) {
            console.log('Redirigiendo a dashboard...');
            this.router.navigate(['/dashboard']);
          } else {
            console.log('Redirigiendo a home...');
            this.router.navigate(['/home']);
          }
        } else {
          this.errorMessage = 'No se recibió token del servidor.';
        }
      },
      error: (err) => {
        console.error('Login error completo:', err);
        console.error('Status:', err.status);
        console.error('Error body completo:', err.error);
        
        // Verificar si es problema de credenciales o de tipo de usuario
        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Error de conexión.';
        }
      }
    });
  }
}
