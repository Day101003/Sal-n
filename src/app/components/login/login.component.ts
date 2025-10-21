import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  iniciarSesion() {
    // Credenciales de prueba
    const correoAdmin = 'admin@nailsstudio.com';
    const passwordAdmin = '12345';

    if (this.correo === correoAdmin && this.contrasena === passwordAdmin) {
      alert(' Bienvenida, administradora del salón ');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciales incorrectas. Intenta nuevamente.');
    }
  }
}
