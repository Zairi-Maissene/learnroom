import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseDetailsComponent} from "./course-details/course-details.component";

const routes: Routes = [
  { path: ':id', component: CourseDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}

