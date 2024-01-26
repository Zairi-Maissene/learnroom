import {Component, inject} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ClassroomService} from "../../classroom.service";
import {ClassroomFormComponent} from "../../../modals/classroom-form/classroom-form..component";
import {ClassroomIdComponent} from "../../../modals/classroom-id/classroom-id.component";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent {
  authService = inject(AuthService);
  modalService = inject(NgbModal);
  classroomService = inject(ClassroomService);
  classrooms$ = this.classroomService.getClassrooms()

  onTeacherClick() {
    this.modalService.open(ClassroomFormComponent)
  }

  onStudentClick() {
    this.modalService.open(ClassroomIdComponent)
  }
}
