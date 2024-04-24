import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient) {}

  register(data: any) {
    return this.httpClient.post(`/api/students`, data);
  }

  getStudents(page: number = 1, limit: number = 10) {
    return this.httpClient.get(`/api/students?page=${page}&limit=${limit}`);
  }
}
