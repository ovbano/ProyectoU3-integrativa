import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  constructor(private authService: AuthService) { }

  onSubmit(): void {
    // Enviar los datos del formulario utilizando el servicio de autenticación
    this.authService.sendMessage(this.name, this.email, this.subject, this.message).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado con éxito',
          text: response
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar el mensaje',
          text: 'Hubo un error al enviar tu mensaje, por favor intenta nuevamente.'
        });
      }
    );
  }
}
