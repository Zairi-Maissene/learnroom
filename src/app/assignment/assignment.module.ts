import { NgModule } from '@angular/core';
import {AssignmentRoutingModule} from "./assignment-routing.module";
import {AssignementDetailsComponent} from "./assignement-details/assignement-details.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [AssignementDetailsComponent],
    imports: [
        CommonModule,
        AssignmentRoutingModule,
        ReactiveFormsModule,
        NgbDropdown,
        NgbDropdownMenu,
        NgbDropdownToggle,
        NgbDropdownItem
    ]
})
export class AssignmentModule { }
