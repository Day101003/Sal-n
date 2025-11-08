import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo: string = '';
  contrasena: string = '';
  errorMessage: string = '';
  mostrarContrasena: boolean = false; // ✅ Variable para mostrar/ocultar contraseña

  // ✅ Client ID real de Google
  private readonly GOOGLE_CLIENT_ID = '613596247080-hb1ei0nlsqo3c7c4inmjeaijva7kbnj0.apps.googleusercontent.com';

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGoogleSignIn();
    }
  }

  // ✅ Función para mostrar/ocultar contraseña
  togglePassword(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  initializeGoogleSignIn(): void {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('✅ Google Script cargado');
        this.renderGoogleButton();
      };
      script.onerror = () => {
        console.error('❌ Error al cargar script de Google');
        this.errorMessage = 'No se pudo cargar el servicio de Google Sign-In';
      };
      document.head.appendChild(script);
    } else {
      this.renderGoogleButton();
    }
  }

  renderGoogleButton(): void {
    setTimeout(() => {
      if (typeof google !== 'undefined' && google.accounts) {
        try {
          google.accounts.id.initialize({
            client_id: this.GOOGLE_CLIENT_ID,
            callback: (response: any) => this.handleGoogleLogin(response),
            auto_select: false,
            cancel_on_tap_outside: true
          });

          const buttonDiv = document.getElementById('google-signin-button');
          if (buttonDiv) {
            google.accounts.id.renderButton(buttonDiv, {
              theme: 'outline',
              size: 'large',
              width: 350,
              text: 'signin_with',
              shape: 'rectangular',
              logo_alignment: 'left'
            });
            console.log('✅ Botón de Google renderizado correctamente');
          } else {
            console.error('❌ Elemento #google-signin-button no encontrado');
          }
        } catch (error) {
          console.error('❌ Error al inicializar Google Sign-In:', error);
          this.errorMessage = 'Error al configurar Google Sign-In';
        }
      } else {
        console.error('❌ Google API no disponible');
      }
    }, 500);
  }

  handleGoogleLogin(response: any): void {
    console.log('📩 Respuesta de Google recibida');
    const googleToken = response.credential;
    
    if (!googleToken) {
      this.errorMessage = 'No se recibió token de Google';
      return;
    }

    console.log('🔐 Enviando token al backend...');
    this.authService.googleLogin(googleToken).subscribe({
      next: (res) => {
        console.log('✅ Login con Google exitoso:', res);
        
        if (this.authService.isAdmin()) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('❌ Error en login con Google:', err);
        this.errorMessage = err.error?.message || 'Error al iniciar sesión con Google. Verifica tu backend.';
      }
    });
  }

  iniciarSesion(): void {
    this.errorMessage = '';
    this.authService.login(this.correo, this.contrasena).subscribe({
      next: (body) => {
        const token = body?.token || body?.access_token || body?.jwt;
        if (token) {
          this.authService.saveToken(token);
          console.log('Login exitoso');
          
          if (this.authService.isAdmin()) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.errorMessage = 'No se recibió token del servidor.';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Error de conexión con el servidor.';
        }
      }
    });
  }
}