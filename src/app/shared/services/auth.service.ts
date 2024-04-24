import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, IRegister } from '@shared/interfaces/auth.interface';
import { LoginModel } from '@shared/models/auth.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  register(data: IRegister) {
    return this.httpClient.post(`/api/register`, data);
  }

  login(data: ILogin): Observable<LoginModel> {
    return this.httpClient.post<LoginModel>(`/api/login`, data);
  }

  logout() {
    return this.httpClient.post(`/api/logout`, {});
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  }
}
