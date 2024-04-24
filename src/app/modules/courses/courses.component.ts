import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '@shared/services/courses.service';
import 'datatables.net-buttons-dt';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  dtOptions: any = {};

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit() {
    //delete options

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      select: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.coursesService.getAll().subscribe((data: any) => {
          callback({
            recordsTotal: data.total,
            recordsFiltered: data.data,
            data: data.data,
          });
        });
      },
      columns: [
        { title: 'Id', data: 'id' },
        { title: 'Nombre del curso', data: 'name' },
        { title: 'Fecha de inicio', data: 'start_date' },
        { title: 'Fecha fin', data: 'end_date' },
        {
          title: 'Acción',
          data: null,
          render: (data: any, type: any, full: any) => {
            //click delete
            const id = '#deleteCourse';
            $(document).on('click', id, () => {
              console.log('click delete');
              //this.deleteCourse(full.id);
            });

            return (
              '<a routerLink="/dashboard/cursos/edit' +
              full.id +
              '" class="btn btn-primary me-2"><i class="bi bi-pencil-square"></i></a>' +
              '<button type="button" class="btn btn-danger" id="deleteCourse" ><i class="bi bi-trash"></i></button>'
            );
          },
        },
      ],
    };
  }

  deleteCourse(id: number) {
    this.coursesService.delete(id).subscribe((data) => {
      console.log('data', data);
    });
  }
}
