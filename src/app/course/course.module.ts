import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { Task_assignmentCardComponent } from './components/task_assignment-card/task_assignment-card.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseAccordionComponent } from './components/course-accordion/course-accordion.component';
import { CourseFormComponent } from '../modals/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Task_assignmentCardComponent,
    CourseListComponent,
    CourseAccordionComponent,
    CourseFormComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgbAccordionModule,
    ReactiveFormsModule,
  ],
  exports: [Task_assignmentCardComponent, CourseListComponent],
})
export class CourseModule {}
