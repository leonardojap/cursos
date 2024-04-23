import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterStudentsComponent } from './register-students/register-students.component';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  {
    path: 'listado',
    component: StudentsComponent,
  },
  {
    path: 'registro',
    component: RegisterStudentsComponent,
  },
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
