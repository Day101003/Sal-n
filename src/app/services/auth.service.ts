import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5229/api/auth';

  constructor(private http: HttpClient) {}

  // devuelve body con { token: '...' }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  saveToken(token: string): void { localStorage.setItem('token', token); }
  getToken(): string | null { return localStorage.getItem('token'); }
  logout(): void { localStorage.removeItem('token'); }
}