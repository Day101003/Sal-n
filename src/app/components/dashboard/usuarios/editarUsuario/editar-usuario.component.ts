import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  usuario = {
    nombre: 'María López',
    correo: 'maria@email.com',
    rol: 'Recepcionista',
    estado: 'Activo'
  };

  constructor(private router: Router, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('✏️ Editando usuario ID:', id);
  }

  guardarUsuario() {
    alert(`✅ Cambios guardados para ${this.usuario.nombre}`);
    this.router.navigate(['/dashboard/usuarios']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/usuarios']);
  }
}
