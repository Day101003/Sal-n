import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  usuario: any = {
    nombre: '',
    correo: '',
    telefono: '',
    rutaImg: '',
    preferencias: ''
  };
  
  imagenSeleccionada: File | null = null;
  previsualizacion: string | null = null;
  cargando = false;
  error = '';
  mensaje = '';

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.auth.getCurrentUser().subscribe({
      next: (data) => {
        this.usuario = { ...data };
        this.previsualizacion = data.rutaImg;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar datos del perfil.';
        this.cargando = false;
        console.error('Error:', err);
      }
    });
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.error = 'Por favor selecciona una imagen válida.';
        return;
      }
      
      // validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.error = 'La imagen no debe superar 5MB.';
        return;
      }

      this.imagenSeleccionada = file;
      
      // crear previsualización
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previsualizacion = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      
      this.error = '';
    }
  }

  eliminarImagen(): void {
    this.imagenSeleccionada = null;
    this.previsualizacion = null;
    this.usuario.rutaImg = '';
  }

  guardarCambios(): void {
    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    const formData = new FormData();
    formData.append('Nombre', this.usuario.nombre);
    formData.append('Correo', this.usuario.correo);
    formData.append('Telefono', this.usuario.telefono || '');
    formData.append('Preferencias', this.usuario.preferencias || '');
    
    if (this.imagenSeleccionada) {
      formData.append('ImagenPerfil', this.imagenSeleccionada, this.imagenSeleccionada.name);
    }

    this.http.put(`http://localhost:5229/api/users/${this.usuario.idUsuario}`, formData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.mensaje = 'Perfil actualizado exitosamente.';
          this.cargando = false;
          
          // Recargar datos del usuario para actualizar el token si es necesario
          setTimeout(() => {
            // Forzar recarga completa para actualizar dashboard y perfil
            window.location.href = '/dashboard/perfil';
          }, 1500);
        },
        error: (err) => {
          console.error('Error completo:', err);
          this.error = 'Error al actualizar perfil.';
          this.cargando = false;
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/perfil']);
  }
}
