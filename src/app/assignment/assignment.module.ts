import { NgModule } from '@angular/core';
import {AssignmentRoutingModule} from "./assignment-routing.module";
import {AssignementDetailsComponent} from "./components/assignement-details/assignement-details.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import {CourseModule} from "../course/course.module";
import {SharedModule} from "../shared/shared.module";
import {AssignmentFormComponent} from "../modals/assignment-form/assignment-form.component";



@NgModule({
  declarations: [
    AssignmentFormComponent,
    AssignementDetailsComponent,
    AssignmentListComponent],
  exports: [
    AssignmentListComponent
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    SharedModule,
    CourseModule,
    ReactiveFormsModule
  ]
})
export class AssignmentModule { }
