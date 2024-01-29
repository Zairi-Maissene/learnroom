import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { startWith } from 'rxjs';
import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { map } from 'rxjs';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs';
import { debounceTime } from 'rxjs';
import { switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Assignement } from '../../../assignment/assignement.service';
import { CourseService } from '../../../course/course.service';
import { Course } from '../../../course/course.service';
import { StudentFormComponent } from '../../../modals/student-form/student-form.component';
import { Task } from '../../../task/task.service';
import { ClassroomService } from '../../classroom.service';
import { Classroom } from '../../classroom.service';
import { AuthService } from '../../../auth/auth.service';
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
  courses$: Observable<Course[]> | undefined = new Observable<Course[]>();
  modalService = inject(NgbModal)
  authService = inject(AuthService)
  searchForm: FormGroup = new FormGroup({});
  searchResults$: Observable<Classroom[]> | undefined = new Observable();
  fb = inject(FormBuilder);
  courseService = inject(CourseService)

  initSearch() {
    this.searchForm = this.fb.group({
      searchTerm: [''], // Initial value can be an empty string or any other default value
    });

    this.courses$ = this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(200), // wait for 300ms pause in events
      switchMap((searchTerm: string) => this.courseService.search(searchTerm, this.router.snapshot.params['id'] as string)),
      tap((courses) => console.log(courses)),
      catchError((err) => { console.log(err); return [] })
    )
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: [''], // Initial value can be an empty string or any other default value
    });
    this.classroom$ = this.router.params.pipe(
      switchMap(params => this.classroomService.getClassroom(params['id']))
    );

    this.classroom$.subscribe(classroom => {
      this.assignments$ = this.classroomService.getAssignments(classroom?.id || '')
    })
    this.classroom$.subscribe(classroom => {
      this.tasks$ = this.classroomService.getTasks(classroom?.id || '')
    });

    // Combine observables for search term and classroom ID
    const combinedSearch$ = combineLatest([
      this.searchForm.get('searchTerm')?.valueChanges.pipe(debounceTime(200),
        startWith(''),) || of(''),
      this.classroom$.pipe(
        map(classroom => classroom?.id || ''),
        distinctUntilChanged()
      )
    ]);

    // Use combined observable to trigger course search
    this.courses$ = combinedSearch$.pipe(
      switchMap(([searchTerm, classroomId]: [string, string]) => {
        if (searchTerm) {
          return this.courseService.search(searchTerm, classroomId)
        }
        return this.classroomService.getCourses(classroomId)
        }),
      catchError((err) => {
        console.log(err);
        return [];
      })
    );


  }

  onAddStudentClick() {
    const modal = this.modalService.open(StudentFormComponent)
    modal.componentInstance.classroomId = this.router.snapshot.params['id']
  }
}

