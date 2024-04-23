import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { RegisterCoursesComponent } from './register-courses/register-courses.component';

const routes: Routes = [
  {
    path: 'listado',
    component: CoursesComponent,
  },
  {
    path: 'registro',
    component: RegisterCoursesComponent,
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
export class CoursesRoutingModule {}
