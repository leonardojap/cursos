import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '@shared/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  dtOptions: any = {};

  constructor(
    private studentsService: StudentsService,
    private router: Router
  ) {}
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.studentsService.getStudents().subscribe((data: any) => {
          callback({
            recordsTotal: data.total,
            recordsFiltered: data.data,
            data: data.data,
          });
        });
      },
      columns: [
        { title: 'Id', data: 'id' },
        { title: 'Nombre', data: 'name' },
        { title: 'Apellido', data: 'lastname' },
        { title: 'email', data: 'email' },
        { title: 'Edad', data: 'age' },
        { title: 'Cedula', data: 'identification' },
      ],
    };
  }
}
