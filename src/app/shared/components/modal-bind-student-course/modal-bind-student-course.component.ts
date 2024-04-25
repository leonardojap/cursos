import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from '@shared/services/courses.service';
import { StudentsService } from '@shared/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-bind-student-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-bind-student-course.component.html',
  styleUrl: './modal-bind-student-course.component.scss',
})
export class ModalBindStudentCourseComponent implements OnInit {
  frmRegister!: FormGroup;
  @Input() id!: number;
  listCourses: any[] = [];
  students: any;

  studentListCourse: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getListCourses();
    this.getInfoStudent();
  }

  private initForm(): void {
    this.frmRegister = this.formBuilder.group({
      student_id: [+this.id],
      course_id: [null, [Validators.required]],
    });
  }

  getListCourses() {
    this.coursesService.getAll().subscribe((response: any) => {
      this.listCourses = response.data;
    });
  }

  getInfoStudent() {
    this.studentsService.getStudent(this.id).subscribe((response: any) => {
      this.students = response.data;
      this.studentListCourse = response.data.courses;
    });
  }

  close() {
    this.modalService.dismissAll();
  }

  onSubmit() {
    if (this.frmRegister.invalid) {
      return;
    }

    this.studentsService
      .bindStudentCourse(this.frmRegister.value)
      .subscribe(() => {
        this.getInfoStudent();
      });
  }

  showError(field: string, dirty: boolean = false): boolean | undefined {
    const control = this.frmRegister.get(field)!;
    return dirty
      ? control.invalid && (control.dirty || control.touched)
      : control.invalid && control.touched;
  }

  getErrorsFromField(field: string): any {
    return this.frmRegister.get(field)?.errors;
  }

  deleteCourse(courseId: number) {
    Swal.fire({
      title: 'Desea retirar el curso',
      text: 'Retirar curso',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Retirar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentsService
          .unbindStudentCourse(this.id, courseId)
          .subscribe(() => {
            this.getInfoStudent();
          });
      }
    });
  }
}
