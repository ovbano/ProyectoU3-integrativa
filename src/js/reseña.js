let currentPage = 1;
let totalPages;

async function fetchUsers(page) {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?page=${page}&results=5`
    );
    const data = await response.json();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    data.results.forEach((user) => {
      // Generamos un nivel de satisfacción aleatorio para cada usuario
      const satisfactionLevel = generateRandomSatisfaction();
      const col = document.createElement("div");
      col.classList.add("col-md-4");
      col.innerHTML = `
                <div class="card mb-4">
                <div class="team-item bg-white mb-4">
                    <div class="team-img position-relative overflow-hidden">
                        <img src="${user.picture.large}" class="card-img-top" alt="Foto de perfil">
                        <div class="team-social">
                            <a class="btn btn-outline-primary btn-square" href="https://twitter.com"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-outline-primary btn-square" href="https://www.facebook.com"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-outline-primary btn-square" href="https://www.instagram.com"><i class="fab fa-instagram"></i></a>
                            <a class="btn btn-outline-primary btn-square" href="https://ec.linkedin.com"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="text-center py-4">
                        <h2 class="card-title">${user.name.first} ${user.name.last}</h2>
                        <p class="m-0"></p>
                    </div>
                </div>
            </div>


            <p class="card-text"><strong>Correo Electrónico:</strong> ${user.email}</p>
            <p class="card-text"><strong>País:</strong> ${user.location.country}</p>
            <p class="card-text"><strong>Género:</strong> ${user.gender}</p>
            <p class="card-text"><strong>Edad:</strong> ${user.dob.age}</p>
            <p class="card-text"><strong>Satisfacción:</strong> ${satisfactionLevel} star ★</p>
            </div>
            </div>
            `;
      userList.appendChild(col);
    });

    // Actualizar la página actual y la cantidad total de páginas
    currentPage = page;
    totalPages = Math.ceil(data.info.results / 5);

    // Renderizar los botones de paginación
    renderPagination();
  } catch (error) {
    console.error("Error al obtener datos de usuarios:", error);
  }
}

// Función para renderizar los botones de paginación
function renderPagination() {
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");

  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      fetchUsers(currentPage - 1);
    }
  });

  nextPageButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      fetchUsers(currentPage + 1);
    }
  });
}

// Función para generar un nivel de satisfacción aleatorio entre 1 y 5
function generateRandomSatisfaction() {
  return Math.floor(Math.random() * 5) + 1;
}

// Cargar usuarios cuando la página se cargue
window.addEventListener("load", () => {
  fetchUsers(currentPage);
});
