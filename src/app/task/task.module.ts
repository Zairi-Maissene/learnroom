import { NgModule } from '@angular/core';
import {TaskRoutingModule} from "./task-routing.module";
import {CommonModule} from "@angular/common";
import { TaskListComponent } from './components/task-list/task-list.component';
import {CourseModule} from "../course/course.module";



@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    CourseModule
  ],
  exports:[
    TaskListComponent
  ]
})
export class TaskModule { }
