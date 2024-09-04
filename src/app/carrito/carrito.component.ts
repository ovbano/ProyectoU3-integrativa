import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  cliente: string = '';
  correo: string = '';
  carrito: any[] = [];  // Array para almacenar productos en el carrito
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.cargarCarrito();
    this.calcularTotales();
  }

  cargarCarrito(): void {
    // Aquí puedes cargar el carrito desde almacenamiento local o servicio
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  calcularTotales(): void {
    this.subtotal = this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    this.iva = this.subtotal * 0.21;  // Supongamos un IVA del 21%
    this.total = this.subtotal + this.iva;
  }

  procesarCompra(): void {
    // Implementar la lógica para procesar la compra, tal como enviar los datos a un backend
    console.log('Compra procesada');
    console.log('Cliente:', this.cliente);
    console.log('Correo:', this.correo);
    console.log('Total a pagar:', this.total);
  }

  eliminarProducto(index: number): void {
    this.carrito.splice(index, 1);
    this.calcularTotales();
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}
