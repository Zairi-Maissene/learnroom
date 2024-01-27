import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { debounceTime } from 'rxjs';
import { Observable } from 'rxjs';
import { Classroom } from '../classroom/classroom.service';
import { ClassroomService } from '../classroom/classroom.service';
import { ClassroomFormComponent } from '../modals/classroom-form/classroom-form..component';
import { ClassroomIdComponent } from '../modals/classroom-id/classroom-id.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isTeacher = localStorage.getItem('isTeacher');
  label = this.isTeacher ? 'Add a classroom' : 'Enroll in a classroom';
  // inject bootstrap modal
  modalService = inject(NgbModal);
  classroomService = inject(ClassroomService)
  classrooms: Classroom[] = JSON.parse(localStorage.getItem("user") ?? '{}').classes
  searchForm: FormGroup = new FormGroup({});
  searchResults$: Observable<Classroom[]> | undefined = new Observable();
  fb = inject(FormBuilder);
  userId = JSON.parse(localStorage.getItem("user") ?? '{}')?.id ?? ''

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''], // Initial value can be an empty string or any other default value
    });
      this.searchResults$ = this.searchForm.get('searchTerm')?.valueChanges.pipe(
        debounceTime(200), // wait for 300ms pause in events
        switchMap((searchTerm: string) => this.classroomService.search(searchTerm, this.userId, !!this.isTeacher)),
      )
  }
  onClick() {
    if (this.isTeacher) {
      this.modalService.open(ClassroomFormComponent)
    } else {
      this.modalService.open(ClassroomIdComponent)
    }
  }
}
