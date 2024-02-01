import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, switchMap, tap} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Classroom, ClassroomService} from '../../classroom.service';
import {ClassroomFormComponent} from '../../../modals/classroom-form/classroom-form..component';
import {ClassroomIdComponent} from '../../../modals/classroom-id/classroom-id.component';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {AssignmentFormComponent} from "../../../modals/assignment-form/assignment-form.component";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  modalService = inject(NgbModal);
  classroomService = inject(ClassroomService)
  classrooms: Classroom[] = [];
  isTeacher: boolean | undefined;
  label = 'Enroll in a classroom';
  searchForm: FormGroup = new FormGroup({});
  searchResults$: BehaviorSubject<Classroom[]> = new BehaviorSubject<Classroom[]>([]);
  private router: Router = inject(Router);
  userId:string | undefined=undefined;
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

    this.authService.user$.subscribe((user) => {
      this.userId = user?.id;
    });
    this.searchForm.get('searchTerm')?.valueChanges.pipe(debounceTime(200)).pipe(
      switchMap((searchTerm) => {
        return this.classroomService.getClassrooms(searchTerm);
      })
    ).subscribe((classrooms) => {
      this.classrooms = classrooms;
      this.searchResults$.next(classrooms);
    });

    this.classroomService.getClassrooms().subscribe((classrooms) => {
      this.classrooms = classrooms;
      this.searchResults$.next(classrooms);
    });

    this.authService.isTeacher$.subscribe((user) => {
      this.isTeacher = user;
      if (user) {
        this.label = 'Create a classroom';
      }
    });
  }

  onClick() {
    const modalComponent = this.isTeacher ? ClassroomFormComponent : ClassroomIdComponent;
    if(this.isTeacher)
    {
      const modal = this.modalService.open(ClassroomFormComponent)
      modal.componentInstance.submit.subscribe((emmitedValue:any) => {
        this.addClassroom(emmitedValue)
      });
    }
    else {

    }
  }

  addClassroom(formValues:any)
  {
    this.classroomService.addClassroom(formValues, this.userId as string)
    this.searchForm.get('searchTerm')?.valueChanges.pipe(debounceTime(200)).pipe(
      switchMap((searchTerm) => {
        return this.classroomService.getClassrooms(searchTerm);
      })
    ).subscribe((classrooms) => {
      this.classrooms = classrooms;
      this.searchResults$.next(classrooms);
    });

    this.classroomService.getClassrooms().subscribe((classrooms) => {
      this.classrooms = classrooms;
      this.searchResults$.next(classrooms);
    });

  }

}
