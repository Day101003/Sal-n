import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  mostrarContrasena: boolean = false;
  mostrarConfirmar: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleConfirmar(): void {
    this.mostrarConfirmar = !this.mostrarConfirmar;
  }

  registrar(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Validaciones
    if (!this.nombre.trim()) {
      this.errorMessage = 'El nombre es obligatorio';
      return;
    }

    if (!this.correo.trim() || !this.correo.includes('@')) {
      this.errorMessage = 'Ingresa un correo válido';
      return;
    }

    if (this.contrasena.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Llamar al servicio
    const payload = {
      nombre: this.nombre.trim(),
      correo: this.correo.trim().toLowerCase(),
      contrasena: this.contrasena
    };

    console.log('📤 Enviando datos de registro:', payload);

    this.authService.register(payload).subscribe({
      next: (response) => {
        console.log('✅ Registro exitoso:', response);
        this.successMessage = '¡Registro exitoso! Redirigiendo al login...';
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('❌ Register error completo:', err);
        console.log('Response body:', err.error);
        
        if (err.status === 400) {
          // Error de validación
          if (err.error?.errors) {
            const errors = Object.values(err.error.errors).flat();
            this.errorMessage = errors.join(', ');
          } else if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Error de validación. Verifica los datos ingresados.';
          }
        } else if (err.status === 409) {
          this.errorMessage = 'Este correo ya está registrado';
        } else {
          this.errorMessage = 'Error al registrar. Intenta de nuevo.';
        }
      }
    });
  }
}
