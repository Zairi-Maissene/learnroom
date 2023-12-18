import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PreviewComponent} from "./preview/preview.component";

const routes: Routes = [
  { path: 'classroom', loadChildren: () => import('./classroom/classroom.module').then(m => m.ClassroomModule) },
  { path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CourseModule) },
  { path: 'assignment', loadChildren: () => import('./assignment/assignment.module').then(m => m.AssignmentModule) },
  { path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
  {path:'',component:PreviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
