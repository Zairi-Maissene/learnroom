import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementDetailsComponent } from './element-details/element-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import {Task_assignmentCardComponent} from "./task_assignment-card/task_assignment-card.component";

@NgModule({
  declarations: [ElementDetailsComponent,Task_assignmentCardComponent],
  exports: [ElementDetailsComponent,Task_assignmentCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgbDropdownItem,
  ],
})
export class SharedModule {}
