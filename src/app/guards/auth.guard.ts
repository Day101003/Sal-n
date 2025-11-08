import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isAdmin = this.authService.isAdmin();
    const url = state.url;

    // Si no está logueado, redirigir a login
    if (!isLoggedIn) {
      console.log('❌ No autenticado, redirigiendo a login');
      this.router.navigate(['/login']);
      return false;
    }

    // Rutas que requieren admin
    const adminRoutes = ['/dashboard'];
    const isAdminRoute = adminRoutes.some(route => url.startsWith(route));

    if (isAdminRoute && !isAdmin) {
      console.log('❌ Ruta de admin, usuario no es admin');
      alert('⚠️ Acceso denegado. Solo administradores pueden acceder al dashboard.');
      this.router.navigate(['/home']);
      return false;
    }

    // Permitir acceso si está logueado (para rutas como /perfil)
    console.log('✅ Acceso permitido');
    return true;
  }
}