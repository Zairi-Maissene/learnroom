import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassroomRoutingModule} from "./classroom-routing.module";
import {ClassroomCardComponent} from "./components/Cards/classroom-card/classroom-card.component";
import { ClassroomDetailComponent } from './components/classroom-detail/classroom-detail.component';
import {TaskModule} from "../task/task.module";
import {NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {AssignmentModule} from "../assignment/assignment.module";
import {CourseModule} from "../course/course.module";



@NgModule({
  declarations: [ClassroomCardComponent,ClassroomDetailComponent],
  imports: [
    NgbNavModule,
    CommonModule,
    ClassroomRoutingModule,
    TaskModule,
    AssignmentModule,
    CourseModule
  ],
  exports:[
  ]
})
export class ClassroomModule { }
