import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { AssignementDetailsComponent } from './assignment/assignement-details/assignement-details.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskDetailsComponent,
    AssignementDetailsComponent,
    CourseDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
