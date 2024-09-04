import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadWeatherData();
    // this.setupSidebarToggle();
    const sidebar = this.renderer.selectRootElement('.sidebar', true);
    const sidebarToggler = this.renderer.selectRootElement('.sidebar-toggler', true);
    const sidebarOpener = this.renderer.selectRootElement('.sidebar-opener', true);
  
    // Agregamos los event listeners.
    this.renderer.listen(sidebarToggler, 'click', () => {
      if (sidebar.classList.contains('open')) {
        this.renderer.removeClass(sidebar, 'open');
      } else {
        this.renderer.addClass(sidebar, 'open');
      }
    });

    this.renderer.listen(sidebarOpener, 'click', () => {
      if (sidebar.classList.contains('open')) {
        this.renderer.removeClass(sidebar, 'open');
      } else {
        this.renderer.addClass(sidebar, 'open');
      }
    });
  }

  loadWeatherData(): void {
    const lon = -79.2224149; // Longitud
    const lat = -0.3158526; // Latitud
    const apiKey = '6e22702503ee5be007e314bc3cab67ff';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    this.http.get<any>(url).subscribe(data => {
      const temp = Math.round(data.main.temp);
      const temperaturaValor = this.el.nativeElement.querySelector('#temperatura-valor');
      const temperaturaDescripcion = this.el.nativeElement.querySelector('#temperatura-descripcion');
      const ubicacion = this.el.nativeElement.querySelector('#ubicacion');
      const iconoAnimado = this.el.nativeElement.querySelector('#icono-animado');
      const humedad = this.el.nativeElement.querySelector('#humedad');

      this.renderer.setProperty(temperaturaValor, 'textContent', `${temp} ° C`);
      this.renderer.setProperty(temperaturaDescripcion, 'textContent', this.traducirDescripcion(data.weather[0].description).toUpperCase());
      this.renderer.setProperty(ubicacion, 'textContent', 'Santo Domingo de los Tsáchilas');
      this.renderer.setProperty(humedad, 'textContent', `${data.main.humidity}%`);

      this.setWeatherIcon(iconoAnimado, data.weather[0].main);
    }, error => {
      console.error(error);
    });
  }

  setWeatherIcon(element: any, weatherCondition: string): void {
    let iconSrc = 'src/animated/cloudy-day-1.svg'; // Default icon
    switch (weatherCondition) {
      case 'Thunderstorm': iconSrc = 'sanimated/thunder.svg'; break;
      case 'Drizzle': iconSrc = 'animated/rainy-2.svg'; break;
      case 'Rain': iconSrc = 'animated/rainy-7.svg'; break;
      case 'Snow': iconSrc = 'animated/snowy-6.svg'; break;
      case 'Clear': iconSrc = 'animated/day.svg'; break;
      case 'Atmosphere': iconSrc = 'animated/weather.svg'; break;
      case 'Clouds': iconSrc = 'animated/cloudy-day-1.svg'; break;
    }
    this.renderer.setProperty(element, 'src', iconSrc);
  }

  traducirDescripcion(description: string): string {
    const descriptions: { [key: string]: string } = {
      "thunderstorm with light rain": "Tormenta con lluvia ligera",
    "thunderstorm with rain": "Tormenta con lluvia",
    "thunderstorm with heavy rain": "Tormenta con lluvia intensa",
    "light thunderstorm": "Tormenta ligera",
    "thunderstorm": "Tormenta",
    "heavy thunderstorm": "Tormenta intensa",
    "ragged thunderstorm": "Tormenta irregular",
    "thunderstorm with light drizzle": "Tormenta con llovizna ligera",
    "thunderstorm with drizzle": "Tormenta con llovizna",
    "thunderstorm with heavy drizzle": "Tormenta con llovizna intensa",
    "light intensity drizzle": "Llovizna ligera",
    "drizzle": "Llovizna",
    "heavy intensity drizzle": "Llovizna intensa",
    "light intensity drizzle rain": "Llovizna ligera",
    "drizzle rain": "Llovizna",
    "heavy intensity drizzle rain": "Llovizna intensa",
    "shower rain and drizzle": "Chubascos de lluvia y llovizna",
    "heavy shower rain and drizzle": "Chubascos intensos de lluvia y llovizna",
    "shower drizzle": "Llovizna",
    "light rain": "Lluvia ligera",
    "moderate rain": "Lluvia moderada",
    "heavy intensity rain": "Lluvia intensa",
    "very heavy rain": "Lluvia muy intensa",
    "extreme rain": "Lluvia extrema",
    "freezing rain": "Lluvia helada",
    "light intensity shower rain": "Chubascos ligeros de lluvia",
    "shower rain": "Chubascos de lluvia",
    "heavy intensity shower rain": "Chubascos intensos de lluvia",
    "ragged shower rain": "Chubascos irregulares",
    "light snow": "Nieve ligera",
    "Snow": "Nieve",
    "Heavy snow": "Nieve intensa",
    "Sleet": "Aguanieve",
    "Light shower sleet": "Chubascos de aguanieve ligera",
    "Shower sleet": "Chubascos de aguanieve",
    "Light rain and snow": "Lluvia y nieve ligera",
    "Rain and snow": "Lluvia y nieve",
    "Light shower snow": "Chubascos de nieve ligera",
    "Shower snow": "Chubascos de nieve",
    "Heavy shower snow": "Chubascos de nieve intensos",
    "mist": "Niebla",
    "Smoke": "Humo",
    "Haze": "Neblina",
    "sand/ dust whirls": "Torbellinos de arena/polvo",
    "fog": "Niebla",
    "sand": "Arena",
    "dust": "Polvo",
    "volcanic ash": "Ceniza volcánica",
    "squalls": "Chubascos",
    "tornado": "Tornado",
    "clear sky": "Cielo despejado",
    "few clouds": "Algunas nubes",
    "scattered clouds": "Nubes dispersas",
    "broken clouds": "Nubes rotas",
    "overcast clouds": "Nublado",
    };
    return descriptions[description] || description;
  }
}
