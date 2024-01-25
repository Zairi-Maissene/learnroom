import { inject } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../course.service';

@Component({
  selector: 'app-course-accordion',
  templateUrl: './course-accordion.component.html',
  styleUrls: ['./course-accordion.component.scss'],
})
export class CourseAccordionComponent {
  @Input() course: Course | undefined;
  router = inject(Router)
  onCourseClick() {
    this.router.navigate(['/course', this.course?.id])
  }
}
