import { Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';



import { InventarioComponent } from './components/dashboard/inventario/inventario.component';
import { ServiciosComponent } from './components/dashboard/servicios/servicios.component';
import { CategoriasComponent } from './components/dashboard/categorias/categorias.component';
import { CitasComponent } from './components/dashboard/citas/citas.component';
import { UsuariosComponent } from './components/dashboard/usuarios/usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OlapComponent } from './components/dashboard/olap/olap.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // cargar Home como lazy en /home
{ path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },

  {
    path: 'contacto',
    loadComponent: () => import('./components/home/contacto/contacto.component').then(m => m.ContactoComponent)
  },

  {
    path: 'resenas',
    loadComponent: () =>
      import('./components/reseñas/reseñas.component').then(m => m.ResenasComponent)
  },

  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  

  { path: 'agendar-cita', component: AgendarCitaComponent 

  },
{
  path: 'perfil',
  loadComponent: () => import('./components/perfil-usuario/perfil-usuario.component').then(m => m.PerfilUsuarioComponent),
  canActivate: [AuthGuard]
},

  {
    path: 'servicios-publico',
    loadComponent: () =>
      import('./components/serviciosPublicos/serviciosPublicos.component')
        .then(m => m.ServiciosPublicosComponent)
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'perfil',
        loadComponent: () => import('./components/dashboard/perfil/perfil.component').then(m => m.PerfilComponent)
      },
      {
        path: 'perfil/editar',
        loadComponent: () => import('./components/dashboard/perfil/editar-perfil.component').then(m => m.EditarPerfilComponent)
      },

      {
        path: 'inventario',
        loadComponent: () => import('./components/dashboard/inventario/inventario.component').then(m => m.InventarioComponent)
      },
      {
        path: 'inventario/nuevo',
        loadComponent: () => import('./components/dashboard/inventario/crearProducto/nuevo-producto.component').then(m => m.NuevoProductoComponent)
      },
      {
        path: 'inventario/editar/:id',
        loadComponent: () => import('./components/dashboard/inventario/editarProducto/editar-producto.component').then(m => m.EditarProductoComponent)
      },
      {
        path: 'servicios',
        loadComponent: () => import('./components/dashboard/servicios/servicios.component').then(m => m.ServiciosComponent)
      },
      {
        path: 'categorias',
        loadComponent: () => import('./components/dashboard/categorias/categorias.component').then(m => m.CategoriasComponent)
      },
      {
        path: 'citas',
        loadComponent: () => import('./components/dashboard/citas/citas.component').then(m => m.CitasComponent)
      },
      {
        path: 'citas/crear',
        loadComponent: () => import('./components/dashboard/citas/crearCita/crear-cita.component').then(m => m.CrearCitaComponent)
      },
      {
        path: 'citas/editar/:id',
        loadComponent: () => import('./components/dashboard/citas/editarCita/editar-cita.component').then(m => m.EditarCitaComponent)
      },

      {
        path: 'usuarios',
        loadComponent: () => import('./components/dashboard/usuarios/usuarios.component').then(m => m.UsuariosComponent)
      },
      {
        path: 'usuarios/crear',
        loadComponent: () => import('./components/dashboard/usuarios/crearUsuario/crear-usuario.component').then(m => m.CrearUsuarioComponent)
      },
      {
        path: 'usuarios/editar/:id',
        loadComponent: () => import('./components/dashboard/usuarios/editarUsuario/editar-usuario.component').then(m => m.EditarUsuarioComponent)
      },

      {
        path: 'olap',
        loadComponent: () => import('./components/dashboard/olap/olap.component').then(m => m.OlapComponent)
      },


      {
        path: 'categorias/crear',
        loadComponent: () =>
          import('./components/dashboard/categorias/crearCategoria/crear-categoria.component').then(
            (m) => m.CrearCategoriaComponent
          )
      },
      {
        path: 'categorias/editar/:id',
        loadComponent: () =>
          import('./components/dashboard/categorias/editarCategoria/editar-categoria.component').then(
            (m) => m.EditarCategoriaComponent
          )
      },
      {
        path: 'servicios/crear',
        loadComponent: () => import('./components/dashboard/servicios/crearServicio/crear-servicio.component').then(m => m.CrearServicioComponent)
      },
      {
        path: 'servicios/editar/:id',
        loadComponent: () => import('./components/dashboard/servicios/editarServicio/editar-servicio.component').then(m => m.EditarServicioComponent)
      },
      { path: '', redirectTo: 'olap', pathMatch: 'full' }
    ]
  },

  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },

  // ruta por defecto -> home (público)
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
