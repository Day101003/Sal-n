import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  usuario = {
    nombre: '',
    telefono: '',
    correo: '',
    fecha_registro: new Date().toISOString().split('T')[0],
    clave: '',
    ruta_img: '',
    preferencias: ''
  };

  imagenSeleccionada: File | null = null;
  private apiUrl = 'http://localhost:5229/api/users';

  constructor(private router: Router, private http: HttpClient) {}

  cargarImagen(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar 5MB.');
        return;
      }

      this.imagenSeleccionada = file;
      
      // Previsualización
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.usuario.ruta_img = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarUsuario(): void {
    if (!this.usuario.nombre || !this.usuario.correo || !this.usuario.clave) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('Nombre', this.usuario.nombre);
    formData.append('Correo', this.usuario.correo);
    formData.append('Contrasena', this.usuario.clave);
    formData.append('Telefono', this.usuario.telefono);
    formData.append('Preferencias', this.usuario.preferencias);
    formData.append('Tipo', '1'); // ← VERIFICAR QUE ESTO ESTÉ
    
    if (this.imagenSeleccionada) {
      formData.append('ImagenPerfil', this.imagenSeleccionada, this.imagenSeleccionada.name);
    }

    console.log('FormData enviado:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.http.post(`${this.apiUrl}/register`, formData).subscribe({
      next: () => {
        alert('Usuario administrador creado exitosamente ✅');
        this.router.navigate(['/dashboard/usuarios']);
      },
      error: (err) => {
        console.error('Error completo:', err);
        alert('Error al crear usuario.');
      }
    });
  }

  subirImagenUsuario(): void {
    // Primero obtener el ID del usuario recién creado
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (usuarios) => {
        const usuarioCreado = usuarios.find(u => u.correo === this.usuario.correo);
        if (usuarioCreado && this.imagenSeleccionada) {
          const formData = new FormData();
          formData.append('Nombre', usuarioCreado.nombre);
          formData.append('Correo', usuarioCreado.correo);
          formData.append('Telefono', usuarioCreado.telefono || '');
          formData.append('Preferencias', usuarioCreado.preferencias || '');
          formData.append('ImagenPerfil', this.imagenSeleccionada, this.imagenSeleccionada.name);

          this.http.put(`${this.apiUrl}/${usuarioCreado.idUsuario}`, formData).subscribe({
            next: () => {
              alert('Usuario administrador creado con imagen exitosamente ✅');
              this.router.navigate(['/dashboard/usuarios']);
            },
            error: (err) => {
              console.error('Error al subir imagen:', err);
              alert('Usuario creado pero error al subir imagen.');
              this.router.navigate(['/dashboard/usuarios']);
            }
          });
        } else {
          alert('Usuario administrador creado exitosamente ✅');
          this.router.navigate(['/dashboard/usuarios']);
        }
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
        alert('Usuario creado pero error al obtener datos.');
        this.router.navigate(['/dashboard/usuarios']);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/usuarios']);
  }
}
