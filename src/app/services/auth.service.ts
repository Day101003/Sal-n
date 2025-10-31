import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5229/api/auth';
  private usersUrl = 'http://localhost:5229/api/users';
  private storageKey = 'token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { Email: email, Password: password });
  }

  register(payload: { nombre: string; correo: string; contrasena: string }): Observable<any> {
    const body = {
      Nombre: payload.nombre,
      Correo: payload.correo,
      Contrasena: payload.contrasena,
      Telefono: '',
      RutaImg: '',
      Preferencias: '',
      Tipo: "2"
    };
    return this.http.post<any>(`${this.usersUrl}/register`, body);
  }

  saveToken(token: string): void { 
    localStorage.setItem(this.storageKey, token); 
  }
  
  getToken(): string | null { 
    return localStorage.getItem(this.storageKey); 
  }
  
  logout(): void { 
    localStorage.removeItem(this.storageKey); 
  }

  getUserType(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.Tipo || null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getUserType() === '1';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.Nombre || decoded.nombre || decoded.sub || null;
    } catch {
      return null;
    }
  }

  // nuevo: obtener perfil completo del usuario autenticado
  getCurrentUser(): Observable<any> {
    const token = this.getToken();
    console.log('Token antes de getCurrentUser:', token ? token.substring(0, 20) + '...' : 'NO HAY TOKEN');
    return this.http.get<any>(`${this.usersUrl}/me`);
  }

  // obtener ID del usuario del token
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.IdUsuario ? parseInt(decoded.IdUsuario) : null;
    } catch {
      return null;
    }
  }
}