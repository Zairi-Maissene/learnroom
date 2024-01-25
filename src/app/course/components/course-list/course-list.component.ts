import { inject } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseFormComponent } from '../../../modals/course-form/course-form.component';
import { Course } from '../../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses: Course[] = []
  @Input() classroomId: string | undefined

  isTeacher = localStorage.getItem('isTeacher');
  modalService = inject(NgbModal)

  onAddCourseClick() {
    const modal = this.modalService.open(CourseFormComponent)
    modal.componentInstance.classroomId = this.classroomId
  }
}
