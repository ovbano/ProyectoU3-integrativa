import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeImageEffects();
    }
  }

  initializeImageEffects(): void {
    // Función para manejar el evento mouseenter y mousemove
    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = event.clientX - centerX;
      const offsetY = event.clientY - centerY;

      const transformString = `translateX(${offsetX / 20}px) translateY(${offsetY / 20}px) rotateX(${offsetY / 20}deg) rotateY(${-offsetX / 20}deg) scale(1.1)`;

      target.style.transform = transformString;
    };

    // Función para manejar el evento mouseleave
    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      target.style.transform = 'none';
    };

    // Obtén todas las imágenes
    const images = document.querySelectorAll('.about-text img, .position-relative img');

    // Agrega listeners de eventos a todas las imágenes
    images.forEach(image => {
      image.addEventListener('mouseenter', (event) => handleMouseMove(event as MouseEvent));
      image.addEventListener('mousemove', (event) => handleMouseMove(event as MouseEvent));
      image.addEventListener('mouseleave', (event) => handleMouseLeave(event as MouseEvent));
    });
  }
}
