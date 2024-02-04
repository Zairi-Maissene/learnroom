import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { map } from 'rxjs';
import { of } from 'rxjs';
import { startWith } from 'rxjs';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { Classroom } from '../../../../core/models/classroom.model';
import { Course } from '../../../../core/models/course.model';
import { User } from '../../../../core/models/user.model';
import { AuthPersistence } from '../../../../core/services/auth.persistence';
import { ClassroomService } from '../../classroom.service';
import { ClassroomFormComponent } from '../../components/classroom-form/classroom-form..component';
import { ClassroomIdComponent } from '../../components/classroom-id/classroom-id.component';

@Component({
  selector: 'app-classrooms-page',
  templateUrl: './classrooms-page.component.html',
  styleUrls: ['./classrooms-page.component.scss']
})
export class ClassroomsPageComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthPersistence);
  modalService = inject(NgbModal);
  classroomService = inject(ClassroomService);
  classrooms$: Observable<Classroom []> | undefined = new Observable<Classroom[]>()
  isTeacher: boolean | undefined;
  label = 'Enroll in a classroom';
  searchForm: FormGroup = new FormGroup({});
  searchResults$: BehaviorSubject<Classroom[]> = new BehaviorSubject<
    Classroom[]
    >([]);
  private router: Router = inject(Router);
  user: User | undefined;
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.classrooms$ = this.searchForm
      .get('searchTerm')
      ?.valueChanges.pipe(debounceTime(200))
      .pipe(
        startWith(''),
        switchMap((searchTerm: string) => {
          return this.classroomService.getClassrooms(searchTerm);
        }),
      )

    this.authService.isTeacher$.subscribe((user) => {
      this.isTeacher = user;
      if (user) {
        this.label = 'Create a classroom';
      }
    });
  }

  onClick() {
    if (this.isTeacher && this.user) {
      const modal = this.modalService.open(ClassroomFormComponent);
      modal.componentInstance.submit.subscribe((emmitedValue: any) => {
        this.addClassroom(emmitedValue);
      });
    } else if (this?.user?.email) {
      const modal = this.modalService.open(ClassroomIdComponent);
      modal.componentInstance.submit.subscribe((emmitedValue: any) => {
        this.enrollClassroom(emmitedValue);
      });
    }
  }

  addClassroom(formValues: any) {
    this.classroomService
      .addClassroom(formValues, this.user?.id as string)
      .subscribe({
        complete: () => this.refetchData(),
      });
  }

  enrollClassroom(formValues: any) {
    this.classroomService
      .addStudent(formValues, this.user?.email as string)
      .subscribe({
        complete: () => this.refetchData(),
      });
  }
  refetchData() {
    this.classrooms$ = this.classroomService.getClassrooms();
  }
}
