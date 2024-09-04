import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface CartItem {
  type: string;
  option: string;
  price: number;
  quantity: number;
  image: string;
  name: string;
}

interface SelectedProduct {
  type: string;
  option: string;
  image: any;
  prices: any;
  names: any;
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
  isLoading: boolean = false;
  cart: {
    items: CartItem[];
    total: number;
  } = {
    items: [],
    total: 0,
  };

  selectedProduct: SelectedProduct = {
    type: 'Notebook',
    option: 'original',
    image: {
      Notebook: {
        original: 'img/arkana_notebook_original.jpg',
        red: 'img/arkana_notebook_red_md.jpg',
        blue: 'img/arkana_notebook_blue_md.jpg',
        black: 'img/arkana_notebook_black_md.jpg',
        texture1: 'img/arkana_notebook_t1_md.jpg',
        texture2: 'img/arkana_notebook_t2_md.jpg',
        texture3: 'img/arkana_notebook_t3_md.jpg',
      },
      Agenda: {
        original: 'img/arkana_agenda_original.jpg',
        red: 'img/arkana_agenda_red_md.jpg',
        blue: 'img/arkana_agenda_blue_md.jpg',
        black: 'img/arkana_agenda_black_md.jpg',
        texture1: 'img/arkana_agenda_t1_md.jpg',
        texture2: 'img/arkana_agenda_t2_md.jpg',
        texture3: 'img/arkana_agenda_t3_md.jpg',
      },
    },
    prices: {
      Notebook: {
        original: 1.0,
        red: 1.25,
        blue: 1.25,
        black: 1.25,
        texture1: 2.0,
        texture2: 2.0,
        texture3: 2.0,
      },
      Agenda: {
        original: 1.5,
        red: 1.75,
        blue: 1.75,
        black: 1.75,
        texture1: 2.5,
        texture2: 2.5,
        texture3: 2.5,
      },
    },
    names: {
      Notebook: {
        original: 'Cuaderno Original',
        red: 'Cuaderno Rojo',
        blue: 'Cuaderno Azul',
        black: 'Cuaderno Negro',
        texture1: 'Cuaderno Carro',
        texture2: 'Cuaderno Spiderman',
        texture3: 'Cuaderno Chica',
      },
      Agenda: {
        original: 'Agenda Original',
        red: 'Agenda Roja',
        blue: 'Agenda Azul',
        black: 'Agenda Negra',
        texture1: 'Agenda Carro',
        texture2: 'Agenda Spiderman',
        texture3: 'Agenda Chica',
      },
    },
  };

  // Variables para almacenar la imagen y texto personalizados
  customImage: string | ArrayBuffer | null = null;
  customText: string = '';

  // Opciones adicionales
  includeCalendar: boolean = false;
  includeSeparator: boolean = false;
  includeNumberedSheets: boolean = false;

  // Variable para mostrar el conteo de items en el carrito
  cartItemCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      this.loadCartFromLocalStorage();
    }
    // this.loadCartFromLocalStorage();
    this.updateProductImage();
    this.updateCartItemCount();
  }

  setProductType(type: string): void {
    this.selectedProduct.type = type;
    this.selectedProduct.option = 'original';
    this.updateProductImage();
  }

  selectOption(option: string): void {
    this.selectedProduct.option = option;
    this.updateProductImage();
  }

  updateProductImage(): void {
    // Esta función actualiza la imagen principal basada en la selección actual
  }

  getCurrentPrice(): number {
    const { type, option, prices } = this.selectedProduct;
    return prices[type][option];
  }

  addToCart(): void {
    const { type, option, image, prices, names } = this.selectedProduct;
    const price = this.getCurrentPrice();

    const newItem: CartItem = {
      type,
      option,
      price,
      quantity: 1,
      image: this.customImage ? (this.customImage as string) : image[type][option],
      name: this.customText ? `${names[type][option]} - "${this.customText}"` : names[type][option],
    };

    // Añadir opciones adicionales
    if (this.includeCalendar) {
      newItem.name += ' + Calendario';
      newItem.price += 0.5; // Precio adicional por calendario
    }

    if (this.includeSeparator) {
      newItem.name += ' + Separador';
      newItem.price += 0.25; // Precio adicional por separador
    }

    if (this.includeNumberedSheets) {
      newItem.name += ' + Hojas Numeradas';
      newItem.price += 0.3; // Precio adicional por hojas numeradas
    }

    if (this.customImage) {
      newItem.name += ' + Imagen Personalizada';
      newItem.price += 1.0; // Precio adicional por imagen personalizada
    }

    // Verificar si el producto ya existe en el carrito
    const existingItemIndex = this.cart.items.findIndex(
      (item) => item.name === newItem.name
    );

    if (existingItemIndex > -1) {
      this.cart.items[existingItemIndex].quantity += 1;
    } else {
      this.cart.items.push(newItem);
    }

    this.updateCartTotal();
    this.updateCartItemCount();
    this.saveCartToLocalStorage();

    Swal.fire({
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500,
    });

    // Reiniciar opciones personalizadas después de agregar al carrito
    this.resetCustomizations();
  }

  updateCartTotal(): void {
    this.cart.total = this.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  removeFromCart(index: number): void {
    this.cart.items.splice(index, 1);
    this.updateCartTotal();
    this.updateCartItemCount();
    this.saveCartToLocalStorage();
  }

  confirmPurchase(): void {
    if (this.cart.items.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito Vacío',
        text: 'No hay productos agregados al carrito.',
      });
    } else {
      Swal.fire({
        title: '¿Confirmar compra?',
        text: `Total a pagar: $${this.cart.total.toFixed(2)} USD`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: '¡Compra realizada con éxito!',
            showConfirmButton: false,
            timer: 2000,
          });
          this.cart.items = [];
          this.updateCartTotal();
          this.updateCartItemCount();
          this.saveCartToLocalStorage();
        }
      });
    }
  }

  clearCart(): void {
    this.cart.items = [];
    this.updateCartTotal();
    this.updateCartItemCount();
    this.saveCartToLocalStorage();

    Swal.fire({
      icon: 'success',
      title: 'Carrito vaciado',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  updateCartItemCount(): void {
    this.cartItemCount = this.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }
  
  getTotalPrice(): number {
    let total = 0;
    this.cart.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  updateCartItem(index: number): void {
    this.cart.total = this.getTotalPrice();
  }

  saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // loadCartFromLocalStorage(): void {
  //   const storedCart = localStorage.getItem('cart');
  //   if (storedCart) {
  //     this.cart = JSON.parse(storedCart);
  //     this.updateCartTotal();
  //   }
  // }

  loadCartFromLocalStorage(): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cart = JSON.parse(storedCart);
        this.updateCartTotal();
      }
    } else {
      // Manejar el caso en que localStorage no está disponible
      console.warn('localStorage no está disponible.');
    }
  }
  
  removeCustomImage(): void {
    this.customImage = null;
    this.resetCustomizations(); // Opcional: Reinicia otras personalizaciones si es necesario
  }

  // Manejar archivo de imagen personalizada
  handleImageUpload(event: any) {
    this.isLoading = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.customImage = e.target.result;
      this.isLoading = false;
    };
    reader.readAsDataURL(file);
  }

  // Reiniciar opciones personalizadas
  resetCustomizations(): void {
    this.customImage = null;
    this.customText = '';
    this.includeCalendar = false;
    this.includeSeparator = false;
    this.includeNumberedSheets = false;
  }
}
