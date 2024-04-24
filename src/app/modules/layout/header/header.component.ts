import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
