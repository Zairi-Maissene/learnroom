import { inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { ClassroomService } from '../../classroom/classroom.service';

@Component({
  selector: 'app-classroom-id',
  templateUrl: './classroom-id.component.html',
})
export class ClassroomIdComponent {
  @Input() values = {id: ''};
  classroomForm: FormGroup;
  classroomService: ClassroomService = inject(ClassroomService)
  authService = inject(AuthService)
  userEmail: string | undefined


  constructor(private fb: FormBuilder) {
    this.classroomForm = this.fb.group({
      id: [this.values.id, [Validators.required]],
    });
    this.authService.user$.subscribe((user) => {
      this.userEmail = user?.email;
    });
  }

  onSubmit() {
    if (this.classroomForm.valid && this.userEmail) {
      console.log('here', this.userEmail)

      this.classroomService.addStudent(this.classroomForm.value.id, this.userEmail)
    }
  }
}
