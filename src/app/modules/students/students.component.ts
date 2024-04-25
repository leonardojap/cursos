import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalBindStudentCourseComponent } from '@shared/components/modal-bind-student-course/modal-bind-student-course.component';
import { ModalStudentsComponent } from '@shared/components/modal-students/modal-students.component';
import { StudentsService } from '@shared/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  students: any;

  _modalOptionsNormal: NgbModalOptions = {
    centered: true,
    windowClass: 'modal-contents',
    backdrop: 'static',
    keyboard: false,
  };

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.studentsService.getStudents().subscribe((data: any) => {
      this.students = data;
    });
  }

  deleteCourse(id: number) {
    Swal.fire({
      title: 'Desea eliminar el estudiante',
      text: 'Eliminar registro',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentsService.deleteStudent(id).subscribe((data) => {
          // Recargar la tabla
          this.studentsService.getStudents().subscribe((data: any) => {
            this.students = data;
          });
        });
      }
    });
  }

  edit(id: number) {
    //open modal
    const modalRef = this.modalService.open(
      ModalStudentsComponent,
      this._modalOptionsNormal
    );
    modalRef.componentInstance.id = id;

    //close modal
    modalRef.result.then(
      (result) => {
        this.studentsService.getStudents().subscribe((data: any) => {
          this.students = data;
        });
      },
      (reason) => {
        this.studentsService.getStudents().subscribe((data: any) => {
          this.students = data;
        });
      }
    );
  }

  bindCourseStudent(id: number) {
    //open modal
    const modalRef = this.modalService.open(
      ModalBindStudentCourseComponent,
      this._modalOptionsNormal
    );
    modalRef.componentInstance.id = id;

    //close modal
    modalRef.result.then(
      (result) => {
        this.studentsService.getStudents().subscribe((data: any) => {
          this.students = data;
        });
      },
      (reason) => {
        this.studentsService.getStudents().subscribe((data: any) => {
          this.students = data;
        });
      }
    );
  }
}
