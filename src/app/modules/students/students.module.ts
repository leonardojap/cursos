import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RegisterStudentsComponent } from './register-students/register-students.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';

@NgModule({
  declarations: [StudentsComponent, RegisterStudentsComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class StudentsModule {}
