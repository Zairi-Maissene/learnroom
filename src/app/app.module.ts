import { NgModule } from '@angular/core';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/templates/footer/footer.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AssignmentModule } from './assignment/assignment.module';
import { PreviewComponent } from './preview/preview.component';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { AssignmentFormComponent } from './modals/assignment-form/assignment-form.component';
import { ClassroomFormComponent } from './modals/classroom-form/classroom-form..component';
import { ClassroomIdComponent } from './modals/classroom-id/classroom-id.component';
import { CourseFormComponent } from './modals/course-form/course-form.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { StudentFormComponent } from './modals/student-form/student-form.component';
import { TaskFormComponent } from './modals/task-form/task-form.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TaskDetailsComponent,
    CourseDetailsComponent,
    FooterComponent,
    HeaderComponent,
    AssignmentFormComponent,
    ClassroomFormComponent,
    ClassroomIdComponent,
    CourseFormComponent,
    ErrorModalComponent,
    StudentFormComponent,
    TaskFormComponent,
    HeaderComponent,
    PreviewComponent,
    TextButtonComponent,
  ],
  imports: [
    FormsModule,
    AssignmentModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
    }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
