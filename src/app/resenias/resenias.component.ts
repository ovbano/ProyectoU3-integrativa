import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-resenias',
  standalone: true,
  imports: [],
  templateUrl: './resenias.component.html',
  styleUrl: './resenias.component.css'
})
export class ReseniasComponent {
  currentPage = 1;
  totalPages: number | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchUsers(this.currentPage);

      const prevPageButton = document.getElementById('prevPage');
      const nextPageButton = document.getElementById('nextPage');

      prevPageButton?.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.fetchUsers(this.currentPage - 1);
        }
      });

      nextPageButton?.addEventListener('click', () => {
        if (this.currentPage < this.totalPages!) {
          this.fetchUsers(this.currentPage + 1);
        }
      });
    }
  }

  async fetchUsers(page: number) {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?page=${page}&results=5`
      );
      const data = await response.json();
      const userList = document.getElementById('userList');

      if (userList) {
        userList.innerHTML = '';
        data.results.forEach((user: any) => {
          const satisfactionLevel = this.generateRandomSatisfaction();
          const col = document.createElement('div');
          col.classList.add('col-md-4');
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
                  <h3 class="card-title">${user.name.first} ${user.name.last}</h3>
                  <p class="m-0"></p>
                </div>
              </div>
              <p class="card-text"><strong>Correo Electrónico:</strong> ${user.email}</p>
              <p class="card-text"><strong>País:</strong> ${user.location.country}</p>
              <p class="card-text"><strong>Género:</strong> ${user.gender}</p>
              <p class="card-text"><strong>Edad:</strong> ${user.dob.age}</p>
              <p class="card-text"><strong>Satisfacción:</strong> ${satisfactionLevel} star ★</p>
            </div>
          `;
          userList.appendChild(col);
        });
        this.totalPages = Math.ceil(data.info.results / 5);
      }
    } catch (error) {
      console.error('Error al obtener datos de usuarios:', error);
    }
  }

  generateRandomSatisfaction(): number {
    return Math.floor(Math.random() * 5) + 1;
  }
}
