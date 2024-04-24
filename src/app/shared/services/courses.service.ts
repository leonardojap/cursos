import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  register(data: any) {
    return this.httpClient.post(`/api/courses`, data);
  }

  getAll(page: number = 1, limit: number = 10) {
    return this.httpClient.get(`/api/courses?page=${page}&limit=${limit}`);
  }

  delete(id: number) {
    return this.httpClient.delete(`/api/courses/${id}`);
  }

  update(id: number, data: any) {
    return this.httpClient.put(`/api/courses/${id}`, data);
  }

  get(id: number) {
    return this.httpClient.get(`/api/courses/${id}`);
  }
}
