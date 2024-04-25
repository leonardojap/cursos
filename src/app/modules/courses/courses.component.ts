import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalCursosComponent } from '@shared/components/modal-cursos/modal-cursos.component';
import { ModalSchedulesComponent } from '@shared/components/modal-schedules/modal-schedules.component';
import { CoursesService } from '@shared/services/courses.service';
import 'datatables.net-buttons-dt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses: any;

  _modalOptionsNormal: NgbModalOptions = {
    centered: true,
    windowClass: 'modal-contents',
    backdrop: 'static',
    keyboard: false,
  };

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.coursesService.getAll().subscribe((data: any) => {
      this.courses = data;
    });
  }

  deleteCourse(id: number) {
    Swal.fire({
      title: 'Desea eliminar el curso',
      text: 'Eliminar registro',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.delete(id).subscribe((data) => {
          // Recargar la tabla
          this.coursesService.getAll().subscribe((data: any) => {
            this.courses = data;
          });
        });
      }
    });
  }

  edit(id: number) {
    //open modal
    const modalRef = this.modalService.open(
      ModalCursosComponent,
      this._modalOptionsNormal
    );
    modalRef.componentInstance.id = id;

    //close modal
    modalRef.result.then(
      (result) => {
        this.coursesService.getAll().subscribe((data: any) => {
          this.courses = data;
        });
      },
      (reason) => {
        this.coursesService.getAll().subscribe((data: any) => {
          this.courses = data;
        });
      }
    );
  }

  schedule(id: number) {
    const modalRef = this.modalService.open(
      ModalSchedulesComponent,
      this._modalOptionsNormal
    );
    modalRef.componentInstance.id = id;
  }
}
