import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuario = {
    nombre: 'Dayanna Solano',
    rol: 'Administrador',
    correo: 'dayadmin@nailsstudio.com',
    telefono: '+506 8888-9999',
    fechaRegistro: new Date(2024, 5, 1)
  };
}
