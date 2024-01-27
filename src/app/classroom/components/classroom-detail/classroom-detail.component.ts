import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, switchMap} from 'rxjs';
import {Assignement} from '../../../assignment/assignement.service';
import {Course} from '../../../course/course.service';
import {StudentFormComponent} from '../../../modals/student-form/student-form.component';
import {Task} from '../../../task/task.service';
import {Classroom, ClassroomService} from '../../classroom.service';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.scss'],
})
export class ClassroomDetailComponent {
  active = 1;
  classroom$: Observable<Classroom | undefined> = new Observable();
  classroomService = inject(ClassroomService)
  assignments$: Observable<Assignement[]> = new Observable();
  tasks$: Observable<Task[]> = new Observable()
  router = inject(ActivatedRoute)
  courses$: Observable<Course[]> = new Observable<Course[]>()
  modalService = inject(NgbModal)
  authService = inject(AuthService)

  ngOnInit() {
    this.classroom$ = this.router.params.pipe(
      switchMap(params => this.classroomService.getClassroom(params['id']))
    );
    this.classroom$.subscribe(classroom => {
      this.assignments$ = this.classroomService.getAssignments(classroom?.id || '')
    })
    this.classroom$.subscribe(classroom => {
      this.tasks$ = this.classroomService.getTasks(classroom?.id || '')
    });
    this.classroom$.subscribe(classroom => {
      this.courses$ = this.classroomService.getCourses(classroom?.id || '')
    });
  }

  onAddStudentClick() {
    const modal = this.modalService.open(StudentFormComponent)
    modal.componentInstance.classroomId = this.router.snapshot.params['id']
  }
}

