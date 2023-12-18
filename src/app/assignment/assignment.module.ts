import { NgModule } from '@angular/core';
import {AssignmentRoutingModule} from "./assignment-routing.module";
import {AssignementDetailsComponent} from "./assignement-details/assignement-details.component";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [AssignementDetailsComponent],
  imports: [
    CommonModule,
    AssignmentRoutingModule
  ]
})
export class AssignmentModule { }
