import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomService } from '@features/classroom/classroom.service';
import {Student} from "@core/models/user.model";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'], // Add your styles if needed
})
export class StudentFormComponent {
  studentForm: FormGroup;
  @Input() classroomId: string = '';
  @Output() submit : EventEmitter<Student> = new EventEmitter<Student>();
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private classroomService: ClassroomService,
  ) {
    this.studentForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
     this.submit.emit(this.studentForm.value)
      this.activeModal.dismiss();
    }

  }
  validateField(field: string, code: string) {
    const formControl = this.studentForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }

  onClose() {
    this.activeModal.dismiss('Close click');
  }
}
