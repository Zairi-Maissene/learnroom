import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassroomRoutingModule} from './classroom-routing.module';
import {ClassroomCardComponent} from './components/Cards/classroom-card/classroom-card.component';
import {ClassroomDetailComponent} from './components/classroom-detail/classroom-detail.component';
import {TaskModule} from '../task/task.module';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {AssignmentModule} from '../assignment/assignment.module';
import {CourseModule} from '../course/course.module';
import {ClassroomFormComponent} from '../modals/classroom-form/classroom-form..component';
import {ClassroomIdComponent} from '../modals/classroom-id/classroom-id.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClassroomListComponent} from './components/classroom-list/classroom-list.component';
import {StudentComponent} from "./components/student/student.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ClassroomCardComponent,
    ClassroomDetailComponent,
    ClassroomFormComponent,
    ClassroomIdComponent,
    StudentComponent,
    ClassroomListComponent,
  ],
  imports: [
    SharedModule,
    NgbNavModule,
    CommonModule,
    ClassroomRoutingModule,
    TaskModule,
    AssignmentModule,
    CourseModule,
    ReactiveFormsModule,
  ],
  exports: [
    ClassroomCardComponent
  ],
})
export class ClassroomModule {}
