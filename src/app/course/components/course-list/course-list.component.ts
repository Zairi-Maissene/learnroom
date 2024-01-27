import {Component, inject, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CourseFormComponent} from '../../../modals/course-form/course-form.component';
import {Course} from '../../course.service';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses: Course[] = []
  @Input() classroomId: string | undefined

  modalService = inject(NgbModal)
  authService = inject(AuthService)

  onAddCourseClick() {
    const modal = this.modalService.open(CourseFormComponent)
    modal.componentInstance.classroomId = this.classroomId
  }
}
