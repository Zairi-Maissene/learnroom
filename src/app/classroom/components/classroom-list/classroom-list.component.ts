import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { debounceTime } from 'rxjs';
import { Observable } from 'rxjs';
import { Classroom } from '../../classroom.service';
import { ClassroomService } from '../../classroom.service';
import { ClassroomFormComponent } from '../../../modals/classroom-form/classroom-form..component';
import { ClassroomIdComponent } from '../../../modals/classroom-id/classroom-id.component';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {
  authService = inject(AuthService)
  modalService = inject(NgbModal);
  classroomService = inject(ClassroomService)


  classrooms: Classroom[] =[] ;
  searchForm: FormGroup = new FormGroup({});
  searchResults$: Observable<Classroom[]> | undefined = new Observable();
  fb = inject(FormBuilder);
  userId = '';
  isTeacher = this.authService.isTeacher$;
  label='';
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''], // Initial value can be an empty string or any other default value
    });
    this.searchResults$ = this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(200), // wait for 300ms pause in events
      switchMap((searchTerm: string) => this.classroomService.search(searchTerm, this.userId, !!this.isTeacher)),
    )

    this.authService.user$.subscribe((user) => {
      this.classrooms= user.classes? user.classes:[];
      this.userId = user.id ?? '';
      this.label = user.user ?'Add a classroom' : 'Enroll in a classroom';
      console.log( user)

    })


  }
  onClick() {
    if (this.isTeacher) {
      this.modalService.open(ClassroomFormComponent)
    } else {
      this.modalService.open(ClassroomIdComponent)
    }
  }
}
