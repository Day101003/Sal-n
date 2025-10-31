import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  usuario = {
    idUsuario: 0,
    nombre: '',
    telefono: '',
    correo: '',
    fecha_registro: '',
    clave: '',
    ruta_img: '',
    preferencias: ''
  };

  imagenSeleccionada: File | null = null;
  cargando = false;
  private apiUrl = 'http://localhost:5229/api/users';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarUsuario(parseInt(id));
    }
  }

  cargarUsuario(id: number): void {
    this.cargando = true;
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.usuario = {
          idUsuario: data.idUsuario,
          nombre: data.nombre,
          telefono: data.telefono,
          correo: data.correo,
          fecha_registro: data.fechaRegistro?.split('T')[0] || '',
          clave: '', // no cargar la contraseña por seguridad
          ruta_img: data.rutaImg ? `http://localhost:5229${data.rutaImg}` : '',
          preferencias: data.preferencias
        };
        this.cargando = false;
        console.log('Usuario cargado:', this.usuario);
      },
      error: (err) => {
        console.error('Error al cargar usuario:', err);
        alert('Error al cargar datos del usuario.');
        this.cargando = false;
        this.router.navigate(['/dashboard/usuarios']);
      }
    });
  }

  cargarImagen(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      if (!archivo.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida.');
        return;
      }
      
      if (archivo.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar 5MB.');
        return;
      }

      this.imagenSeleccionada = archivo;
      
      // Previsualización
      const lector = new FileReader();
      lector.onload = () => {
        this.usuario.ruta_img = lector.result as string;
      };
      lector.readAsDataURL(archivo);
    }
  }

  guardarUsuario(): void {
    if (!this.usuario.nombre || !this.usuario.correo) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    this.cargando = true;

    const formData = new FormData();
    formData.append('Nombre', this.usuario.nombre);
    formData.append('Correo', this.usuario.correo);
    formData.append('Telefono', this.usuario.telefono);
    formData.append('Preferencias', this.usuario.preferencias);
    
    if (this.imagenSeleccionada) {
      formData.append('ImagenPerfil', this.imagenSeleccionada, this.imagenSeleccionada.name);
    }

    this.http.put(`${this.apiUrl}/${this.usuario.idUsuario}`, formData).subscribe({
      next: () => {
        alert(`✅ Usuario ${this.usuario.nombre} actualizado exitosamente`);
        this.router.navigate(['/dashboard/usuarios']);
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        alert('Error al actualizar usuario.');
        this.cargando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/usuarios']);
  }
}
