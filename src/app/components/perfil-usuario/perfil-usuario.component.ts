import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any = null;
  cargando: boolean = true;
  modoEdicion: boolean = false;
  
  // Datos editables
  nombre: string = '';
  telefono: string = '';
  preferencias: string = '';
  
  // Para la imagen
  imagenPreview: string | null = null;
  archivoImagen: File | null = null;
  
  private apiUrl = 'http://localhost:5229/api/users';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.cargando = true;
    this.authService.getCurrentUser().subscribe({
      next: (data) => {
        this.usuario = data;
        this.nombre = data.nombre;
        this.telefono = data.telefono || '';
        this.preferencias = data.preferencias || '';
        
        // Cargar imagen si existe
        if (data.rutaImg && data.rutaImg !== '') {
          this.imagenPreview = `http://localhost:5229${data.rutaImg}`;
        }
        
        this.cargando = false;
        console.log('✅ Perfil cargado:', this.usuario);
      },
      error: (err) => {
        console.error('❌ Error al cargar perfil:', err);
        this.cargando = false;
        alert('Error al cargar perfil');
      }
    });
  }

  // Abrir selector de archivos
  abrirSelectorImagen(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.seleccionarImagen(file);
      }
    };
    input.click();
  }

  // Manejar selección de imagen
  seleccionarImagen(file: File): void {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    this.archivoImagen = file;

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagenPreview = e.target.result;
    };
    reader.readAsDataURL(file);

    // Subir automáticamente
    this.subirImagen();
  }

  // Subir imagen al servidor
  subirImagen(): void {
    if (!this.archivoImagen) {
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      alert('Error: No se pudo identificar al usuario');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', this.archivoImagen);
    formData.append('userId', userId.toString());

    console.log('📤 Subiendo imagen...');

    this.http.post(`${this.apiUrl}/upload-avatar`, formData).subscribe({
      next: (response: any) => {
        console.log('✅ Imagen subida:', response);
        alert('✅ Foto de perfil actualizada');
        this.cargarPerfil(); // Recargar perfil
      },
      error: (err) => {
        console.error('❌ Error al subir imagen:', err);
        alert('Error al subir la imagen. Intenta de nuevo.');
        this.imagenPreview = null;
        this.archivoImagen = null;
      }
    });
  }

  activarEdicion(): void {
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    // Restaurar valores originales
    this.nombre = this.usuario.nombre;
    this.telefono = this.usuario.telefono || '';
    this.preferencias = this.usuario.preferencias || '';
  }

  guardarCambios(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('Error: No se pudo identificar al usuario');
      return;
    }

    const datosActualizados = {
      IdUsuario: userId,
      Nombre: this.nombre,
      Correo: this.usuario.correo,
      Contrasena: this.usuario.contrasena,
      Telefono: this.telefono,
      RutaImg: this.usuario.rutaImg || '',
      Preferencias: this.preferencias,
      Tipo: this.usuario.tipo
    };

    this.http.put(`${this.apiUrl}/${userId}`, datosActualizados).subscribe({
      next: () => {
        alert('✅ Perfil actualizado correctamente');
        this.modoEdicion = false;
        this.cargarPerfil();
      },
      error: (err) => {
        console.error('❌ Error al actualizar perfil:', err);
        alert('Error al actualizar perfil');
      }
    });
  }

  cerrarSesion(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}