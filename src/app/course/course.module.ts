import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseAccordionComponent } from './components/course-accordion/course-accordion.component';
import { CourseFormComponent } from '../modals/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {SharedModule} from "../shared/shared.module";
import {TaskModule} from "../task/task.module";
import {AssignmentModule} from "../assignment/assignment.module";
import { CourseDetailCardComponent } from './course-detail-card/course-detail-card.component';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseAccordionComponent,
    CourseFormComponent,
    CourseDetailsComponent,
    CourseDetailCardComponent,


  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    SharedModule,
    TaskModule,
    AssignmentModule

  ],
  exports: [CourseListComponent],
})
export class CourseModule {}
