import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Obtén todas las imágenes usando ElementRef
    const images = this.el.nativeElement.querySelectorAll('.about-text img, .position-relative img');

    // Agrega listeners de eventos a todas las imágenes
    images.forEach((image: HTMLElement) => {
      this.renderer.listen(image, 'mouseenter', this.handleMouseMove);
      this.renderer.listen(image, 'mousemove', this.handleMouseMove);
      this.renderer.listen(image, 'mouseleave', this.handleMouseLeave);
    });
  }

  // Función para manejar el evento mouseenter y mousemove
  handleMouseMove(event: MouseEvent): void {
    // Calcula el centro de la imagen
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calcula el desplazamiento del cursor
    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

    // Crea la cadena de transformación
    const transformString = `translateX(${offsetX / 20}px) translateY(${offsetY / 20}px) rotateX(${offsetY / 20}deg) rotateY(${-offsetX / 20}deg) scale(1.1)`;

    // Aplica la transformación a la imagen
    (event.target as HTMLElement).style.transform = transformString;
  }

  // Función para manejar el evento mouseleave
  handleMouseLeave(event: MouseEvent): void {
    // Reinicia la transformación
    (event.target as HTMLElement).style.transform = 'none';
  }
}
