import { Routes } from '@angular/router';

// Páginas principales
import { HomeComponent } from './components/home/home.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';



import { InventarioComponent } from './components/dashboard/inventario/inventario.component';
import { ServiciosComponent } from './components/dashboard/servicios/servicios.component';
import { CategoriasComponent } from './components/dashboard/categorias/categorias.component';
import { CitasComponent } from './components/dashboard/citas/citas.component';
import { UsuariosComponent } from './components/dashboard/usuarios/usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OlapComponent } from './components/dashboard/olap/olap.component';

export const routes: Routes = [
 
  { path: '', component: HomeComponent },

  
  { path: 'agendar-cita', component: AgendarCitaComponent },

  
  {
  path: 'dashboard',
  loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
  children: [
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
      path: 'usuarios',
      loadComponent: () => import('./components/dashboard/usuarios/usuarios.component').then(m => m.UsuariosComponent)
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

  

  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
