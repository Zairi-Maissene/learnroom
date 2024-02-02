import {Component, inject, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CourseFormComponent} from '../../../modals/course-form/course-form.component';
import {Course, CourseService} from '../../course.service';
import {AuthPersistenceService} from "../../../core/services/authPersistence.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses: Course[] = []
  @Input() classroomId: string | undefined

  modalService = inject(NgbModal)
  authService = inject(AuthPersistenceService)
  courseService = inject(CourseService)

  onAddCourseClick() {
    const modal = this.modalService.open(CourseFormComponent)
    modal.componentInstance.submit.subscribe((emmitedValue:any) => {
      this.addCourse(emmitedValue)
    });
  }
  addCourse(formValues: any) {
    this.courseService.addCourse(this.classroomId as string, formValues)

  }
}
