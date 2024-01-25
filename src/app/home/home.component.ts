import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  ngOnInit() {
    console.log(this.classrooms)
  }

  onClick() {
    if (this.isTeacher) {
      this.modalService.open(ClassroomFormComponent)
    } else {
      this.modalService.open(ClassroomIdComponent)
    }
  }
}
