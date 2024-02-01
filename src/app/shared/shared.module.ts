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
import {EmptyListPlaceholderComponent} from "./empty-list-placeholder/empty-list-placeholder.component";
import {AvatarComponent} from "./avatar/avatar.component";

@NgModule({
  declarations: [ElementDetailsComponent,AvatarComponent,Task_assignmentCardComponent,EmptyListPlaceholderComponent],
  exports: [ElementDetailsComponent,AvatarComponent,Task_assignmentCardComponent,EmptyListPlaceholderComponent],
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
