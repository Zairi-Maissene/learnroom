import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, switchMap} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Classroom, ClassroomService} from '../../classroom.service';
import {ClassroomFormComponent} from '../../../modals/classroom-form/classroom-form..component';
import {ClassroomIdComponent} from '../../../modals/classroom-id/classroom-id.component';
import {AuthService} from "../../../auth/auth.service";

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

  isTeacher: boolean | undefined;
  label = 'Enroll in a classroom';
  searchForm: FormGroup = new FormGroup({});
  searchResults$: BehaviorSubject<Classroom[]> = new BehaviorSubject<Classroom[]>([]);

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

      this.searchForm.get('searchTerm')?.valueChanges.pipe(debounceTime(200)).pipe(
      switchMap((searchTerm) => {
        return this.classroomService.getClassrooms(searchTerm);
      })
    ).subscribe((classrooms) => {
      this.searchResults$.next(classrooms);
    });

      this.classroomService.getClassrooms().subscribe((classrooms) => {
      this.searchResults$.next(classrooms);
      })

    this.authService.isTeacher$.subscribe((user) => {
      this.isTeacher = user;
      if (user) {
        this.label = 'Create a classroom';
      }
    });
  }

  onClick() {
    const modalComponent = this.isTeacher ? ClassroomFormComponent : ClassroomIdComponent;
    this.modalService.open(modalComponent);
  }
}
