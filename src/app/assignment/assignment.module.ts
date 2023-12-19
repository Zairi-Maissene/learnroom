import { NgModule } from '@angular/core';
import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignementDetailsComponent } from './assignement-details/assignement-details.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { CourseModule } from '../course/course.module';

@NgModule({
  declarations: [AssignementDetailsComponent, AssignmentListComponent],
  exports: [AssignementDetailsComponent, AssignmentListComponent],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    ReactiveFormsModule,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgbDropdownItem,
    CourseModule,
  ],
})
export class AssignmentModule {}
