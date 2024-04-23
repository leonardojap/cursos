import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly urlBase = `${environment.apiBaseUrl}`;
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.post(`${this.urlBase}/login`, { email, password });
  }

  logout() {
    return this.httpClient.post(`${this.urlBase}/logout`, {});
  }

  register(email: string, password: string) {
    return this.httpClient.post(`${this.urlBase}/register`, {
      email,
      password,
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  }
}
