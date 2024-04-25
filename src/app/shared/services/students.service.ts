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

  getStudent(id: number) {
    return this.httpClient.get(`/api/students/${id}`);
  }

  updateStudent(id: number, data: any) {
    return this.httpClient.put(`/api/students/${id}`, data);
  }

  deleteStudent(id: number) {
    return this.httpClient.delete(`/api/students/${id}`);
  }

  //bind student to course
  bindStudentCourse(data: any) {
    return this.httpClient.post(`/api/bind-student-course`, data);
  }

  //unbind student to course
  unbindStudentCourse(student: number, course: number) {
    return this.httpClient.delete(`/api/student-courses/${student}/${course}`);
  }
}
