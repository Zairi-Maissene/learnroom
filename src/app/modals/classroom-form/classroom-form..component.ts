// Import necessary Angular modules
import { inject } from '@angular/core';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Classroom } from '../../classroom/classroom.service';
import { ClassroomService } from '../../classroom/classroom.service';
import { ErrorService } from '../../error.service';

@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.scss'],
})
export class ClassroomFormComponent {
  @Input() values = { name: '', description: '' };

  classroomForm: FormGroup;
  errorService = inject(ErrorService);
  classroomService = inject(ClassroomService);
  authService = inject(AuthService);
  userId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
  ) {
    this.classroomForm = this.fb.group({
      name: [this.values.name, Validators.required],
      description: [this.values.description, Validators.required],
    });
    this.authService.user$.subscribe((user) => {
     this.userId = user?.id;
    });
  }

  onSubmit() {
    // Handle form submission logic here
    const formValues = this.classroomForm.value;
    if (this.classroomForm.valid && this.userId) {
      this.classroomService.addClassroom(formValues, this.userId)
    }
    // Call the handleSubmit function or perform your desired actions
  }
  validateField(field: string, code: string) {
    const formControl = this.classroomForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }
  onClose() {
    // Handle close modal logic here
    this.modal.dismiss();
  }
}
