import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PouchDBServiceService } from '../pouch-dbservice.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private pouchDBService: PouchDBServiceService) { }

  register() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    if (navigator.onLine) {
      this.authService.register(this.username, this.email, this.password).subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = response['message'] || 'Error al registrar el usuario.';
          }
        },
        error => {
          console.error('Error:', error);
          this.errorMessage = 'Error de conexión al servidor.';
          this.saveUserLocally(userData); // Guardar localmente si hay un error de conexión
        }
      );
    } else {
      this.saveUserLocally(userData); // Guardar localmente si está offline
    }
  }

  private saveUserLocally(userData: any) {
    this.pouchDBService.saveData(userData).then(() => {
      console.log('Usuario guardado en la base de datos local');
      this.errorMessage = 'Usuario guardado localmente.';
    }).catch(err => {
      console.error('Error al guardar el usuario localmente', err);
      this.errorMessage = 'No se pudo guardar el usuario localmente.';
    });
  }
}
