import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PouchDBServiceService } from '../pouch-dbservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private pouchDBService: PouchDBServiceService) { }

  login() {
    if (navigator.onLine) {
      this.authService.login(this.username, this.password).subscribe(
        response => {
          if (response.success) {
            localStorage.setItem('username', this.username);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = response.message || 'Nombre de usuario o contraseña incorrectos.';
          }
        },
        error => {
          console.error('Error:', error);
          this.errorMessage = 'Error de conexión al servidor.';
          this.loginOffline(this.username, this.password);
        }
      );
    } else {
      this.loginOffline(this.username, this.password);
    }
  }

  private async loginOffline(username: string, password: string) {
    try {
      const userData = await this.pouchDBService.getUserData(username);
      if (userData) {
        if (userData.password === password) {
          localStorage.setItem('username', username);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
        }
      } else {
        this.errorMessage = 'No se encontró el usuario en la base de datos local.';
      }
    } catch (err) {
      console.error('Error al acceder a la base de datos local', err);
      this.errorMessage = 'Error al acceder a la base de datos local.';
    }
  }
  
  
}
