import {Component, inject, OnDestroy} from '@angular/core';
import {Course, CourseService} from "../course.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../task/task.service";
import {Assignement} from "../../assignment/assignement.service";

@Component({
  selector: 'app-course-detail-card',
  templateUrl: './course-detail-card.component.html',
  styleUrls: ['./course-detail-card.component.scss']
})
export class CourseDetailCardComponent  implements OnDestroy{
  tasks$: Observable<Task[]> = new Observable<Task[]>();
  assignments$: Observable<Assignement[]> = new Observable<Assignement[]>();
  selectedCourse: Course | null = null;
  private subscription: Subscription;
  router = inject(Router);
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.subscription = this.courseService.selectedCourse$.subscribe(
      (course) => {
        this.selectedCourse = course;
        if (course) {
          this.tasks$ = this.courseService.getTasks(course?.id);
          this.assignments$ = this.courseService.getAssignments(course?.id);
        }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onCourseClick() {
    this.router.navigate(['/course', this.selectedCourse?.id]);
  }
}
