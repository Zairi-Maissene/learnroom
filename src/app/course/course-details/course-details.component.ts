import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Assignement, AssignementService, ResponseAssignement} from "../../assignment/assignement.service";
import {Task} from "../../task/task.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Course, CourseService} from "../course.service";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit{
  tasks$: Observable<Task[]> = new Observable<Task[]>();
  assignments$: Observable<Assignement[]> = new Observable<Assignement[]>();
  course$: Observable<Course> = new Observable<Course>();
  courseId: string="";
  constructor(private route: ActivatedRoute,private courseService: CourseService)
  { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.course$=this.courseService.getCourse(this.courseId)
    this.tasks$=this.courseService.getTasks(this.courseId)
    this.assignments$=this.courseService.getAssignments(this.courseId)
  }


}
