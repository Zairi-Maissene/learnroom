import { NgModule } from '@angular/core';
import {AssignmentRoutingModule} from "./assignment-routing.module";
import {AssignementDetailsComponent} from "./assignement-details/assignement-details.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [AssignementDetailsComponent],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    ReactiveFormsModule
  ]
})
export class AssignmentModule { }
