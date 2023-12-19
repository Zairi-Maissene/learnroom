import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'], // Add your styles if needed
})
export class StudentFormComponent {
  studentForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const email = this.studentForm.value.email;
      console.log('Enrolling student with email:', email);
      this.activeModal.close();
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
