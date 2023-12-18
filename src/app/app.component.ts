import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignementService } from './assignment/assignement.service';
import { AppModalComponent } from './modals/app-modal/app-modal.component';
import { AssignmentFormComponent } from './modals/assignment-form/assignment-form.component';
import { ClassroomFormComponent } from './modals/classroom-form/classroom-form..component';
import { CourseFormComponent } from './modals/course-form/course-form.component';
import { StudentFormComponent } from './modals/student-form/student-form.component';
import { TaskFormComponent } from './modals/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modalService = inject(NgbModal);
  openModal() {
    this.modalService.open(ClassroomFormComponent);
  }
}
