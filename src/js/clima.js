window.addEventListener("load", () => {
  let lon = -79.2224149; // Longitud
  let lat = -0.3158526; // Latitud

  let temperaturaValor = document.getElementById("temperatura-valor");
  let temperaturaDescripcion = document.getElementById(
    "temperatura-descripcion"
  );
  let ubicacion = document.getElementById("ubicacion");
  let iconoAnimado = document.getElementById("icono-animado");
  let humedad = document.getElementById("humedad");
  const apiKey = "6e22702503ee5be007e314bc3cab67ff";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let temp = Math.round(data.main.temp);
      temperaturaValor.textContent = `${temp} ° C`;

      let desc = traducirDescripcion(data.weather[0].description);
      temperaturaDescripcion.textContent = desc.toUpperCase();
      ubicacion.textContent = "Santo Domingo de los Tsáchilas"; // Cambia esto si deseas mostrar otro lugar
      humedad.textContent = `${data.main.humidity}%`;

      switch (data.weather[0].main) {
        case "Thunderstorm":
          iconoAnimado.src = "src/animated/thunder.svg";
          console.log("TORMENTA");
          break;
        case "Drizzle":
          iconoAnimado.src = "src/animated/rainy-2.svg";
          console.log("LLOVIZNA");
          break;
        case "Rain":
          iconoAnimado.src = "src/animated/rainy-7.svg";
          console.log("LLUVIA");
          break;
        case "Snow":
          iconoAnimado.src = "src/animated/snowy-6.svg";
          console.log("NIEVE");
          break;
        case "Clear":
          iconoAnimado.src = "src/animated/day.svg";
          console.log("LIMPIO");
          break;
        case "Atmosphere":
          iconoAnimado.src = "src/animated/weather.svg";
          console.log("ATMOSFERA");
          break;
        case "Clouds":
          iconoAnimado.src = "src/animated/cloudy-day-1.svg";
          console.log("NUBES");
          break;
        default:
          iconoAnimado.src = "src/animated/cloudy-day-1.svg";
          console.log("por defecto");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const sidebarOpener = document.querySelector(".sidebar-opener");

sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

sidebarOpener.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

function traducirDescripcion(description) {
  switch (description) {
    case "thunderstorm with light rain":
      return "Tormenta con lluvia ligera";
    case "thunderstorm with rain":
      return "Tormenta con lluvia";
    case "thunderstorm with heavy rain":
      return "Tormenta con lluvia intensa";
    case "light thunderstorm":
      return "Tormenta ligera";
    case "thunderstorm":
      return "Tormenta";
    case "heavy thunderstorm":
      return "Tormenta intensa";
    case "ragged thunderstorm":
      return "Tormenta irregular";
    case "thunderstorm with light drizzle":
      return "Tormenta con llovizna ligera";
    case "thunderstorm with drizzle":
      return "Tormenta con llovizna";
    case "thunderstorm with heavy drizzle":
      return "Tormenta con llovizna intensa";
    case "light intensity drizzle":
      return "Llovizna ligera";
    case "drizzle":
      return "Llovizna";
    case "heavy intensity drizzle":
      return "Llovizna intensa";
    case "light intensity drizzle rain":
      return "Llovizna ligera";
    case "drizzle rain":
      return "Llovizna";
    case "heavy intensity drizzle rain":
      return "Llovizna intensa";
    case "shower rain and drizzle":
      return "Chubascos de lluvia y llovizna";
    case "heavy shower rain and drizzle":
      return "Chubascos intensos de lluvia y llovizna";
    case "shower drizzle":
      return "Llovizna";
    case "light rain":
      return "Lluvia ligera";
    case "moderate rain":
      return "Lluvia moderada";
    case "heavy intensity rain":
      return "Lluvia intensa";
    case "very heavy rain":
      return "Lluvia muy intensa";
    case "extreme rain":
      return "Lluvia extrema";
    case "freezing rain":
      return "Lluvia helada";
    case "light intensity shower rain":
      return "Chubascos ligeros de lluvia";
    case "shower rain":
      return "Chubascos de lluvia";
    case "heavy intensity shower rain":
      return "Chubascos intensos de lluvia";
    case "ragged shower rain":
      return "Chubascos irregulares";
    case "light snow":
      return "Nieve ligera";
    case "Snow":
      return "Nieve";
    case "Heavy snow":
      return "Nieve intensa";
    case "Sleet":
      return "Aguanieve";
    case "Light shower sleet":
      return "Chubascos de aguanieve ligera";
    case "Shower sleet":
      return "Chubascos de aguanieve";
    case "Light rain and snow":
      return "Lluvia y nieve ligera";
    case "Rain and snow":
      return "Lluvia y nieve";
    case "Light shower snow":
      return "Chubascos de nieve ligera";
    case "Shower snow":
      return "Chubascos de nieve";
    case "Heavy shower snow":
      return "Chubascos de nieve intensos";
    case "mist":
      return "Niebla";
    case "Smoke":
      return "Humo";
    case "Haze":
      return "Neblina";
    case "sand/ dust whirls":
      return "Torbellinos de arena/polvo";
    case "fog":
      return "Niebla";
    case "sand":
      return "Arena";
    case "dust":
      return "Polvo";
    case "volcanic ash":
      return "Ceniza volcánica";
    case "squalls":
      return "Chubascos";
    case "tornado":
      return "Tornado";
    case "clear sky":
      return "Cielo despejado";
    case "few clouds":
      return "Algunas nubes";
    case "scattered clouds":
      return "Nubes dispersas";
    case "broken clouds":
      return "Nubes rotas";
    case "overcast clouds":
      return "Nublado";
    default:
      return description;
  }
}

// Espera a que se cargue completamente el contenido de la página
window.addEventListener("load", function () {
  // Oculta el spinner después de 2 segundos
  setTimeout(function () {
    document.querySelector(".spinner-overlay").style.display = "none";
  }, 50);
});
