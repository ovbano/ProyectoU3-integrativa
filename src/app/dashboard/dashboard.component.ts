import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  username: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    if (!this.username) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
