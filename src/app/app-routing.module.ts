import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'classroom',
    loadChildren: () =>
      import('./classroom/classroom.module').then((m) => m.ClassroomModule),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./course/course.module').then((m) => m.CourseModule),
    canActivate: [authGuard],
  },
  {
    path: 'assignment',
    loadChildren: () =>
      import('./assignment/assignment.module').then((m) => m.AssignmentModule),
    canActivate: [authGuard],
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
    canActivate: [authGuard],
  },

  { path: '', component: PreviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
