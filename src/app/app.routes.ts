import { Routes } from '@angular/router';
import { LoggedGuard } from '@shared/guards/logged.guard';
import { SessionGuard } from '@shared/guards/session.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'courses',
    canActivate: [SessionGuard],
    loadChildren: () =>
      import('./modules/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'dashboard',
    canActivate: [SessionGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];
