import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { RegisterCoursesComponent } from './register-courses/register-courses.component';

@NgModule({
  declarations: [CoursesComponent, RegisterCoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CoursesModule {}
