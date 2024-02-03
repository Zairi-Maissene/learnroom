import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementDetailsComponent } from './element-details/element-details.component';
import { EmptyListPlaceholderComponent } from './empty-list-placeholder/empty-list-placeholder.component';
import { AvatarComponent } from './avatar/avatar.component';
import { TextButtonComponent } from '@shared/text-button/text-button.component';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ElementDetailsComponent,
    AvatarComponent,
    EmptyListPlaceholderComponent,
    TextButtonComponent,
  ],
  exports: [
    ElementDetailsComponent,
    AvatarComponent,
    EmptyListPlaceholderComponent,
    TextButtonComponent,
  ],
  imports: [
    CommonModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
  ],
})
export class SharedModule {}
