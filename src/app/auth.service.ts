import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost/conexion/';  // URL del backend

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(`${this.url}login.php`, JSON.stringify(user));
  }

  register(username: string, email: string, password: string): Observable<any> {
    const user = { username, email, password };
    return this.http.post(`${this.url}agregar.php`, JSON.stringify(user));
  }

  getUsuarioConectado(): Observable<any> {
    return this.http.get(`${this.url}usuarioConectado.php`);
  }
  
  logout(): Observable<any> {
    return this.http.post(`${this.url}logout.php`, {});
  }

  sendMessage(name: string, email: string, subject: string, message: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;
  
    return this.http.post(`${this.url}send_mail.php`, body, { headers, responseType: 'text' });
  }  

}
