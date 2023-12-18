import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'classroom', loadChildren: () => import('./classroom/classroom.module').then(m => m.ClassroomModule) },
  { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule) },
  { path: '', loadChildren: () => import('./assignment/assignment.module').then(m => m.AssignmentModule) },
  { path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
