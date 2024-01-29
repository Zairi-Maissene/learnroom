import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreviewComponent} from './preview/preview.component';
import {authenticatedGuard, disconnectedGuard} from './guards/authenticatedGuard';
import {CustomPreloadingStrategy} from "./preloading.strategy";

const routes: Routes = [
  {
    path: 'classroom',
    loadChildren: () =>
      import('./classroom/classroom.module').then((m) => m.ClassroomModule),
    canActivate: [authenticatedGuard],
    data: { preload: true }
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [disconnectedGuard],
    data: { preload: true }
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./course/course.module').then((m) => m.CourseModule),
    canActivate: [authenticatedGuard],
  },
  {
    path: 'assignment',
    loadChildren: () =>
      import('./assignment/assignment.module').then((m) => m.AssignmentModule),
    canActivate: [authenticatedGuard],
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
    canActivate: [authenticatedGuard],
  },
  { path: '', component: PreviewComponent , data: { preload: true }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: CustomPreloadingStrategy})],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
