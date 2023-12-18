// Import necessary Angular modules
import { inject } from '@angular/core';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from '../../error.service';

@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.scss']
})
export class ClassroomFormComponent {
  @Input() values = { name: '', description: '' };

  classroomForm: FormGroup;
  errorService = inject(ErrorService)

  constructor(private fb: FormBuilder, private modal: NgbActiveModal) {
    this.classroomForm = this.fb.group({
      name: [this.values.name, Validators.required],
      description: [this.values.description, Validators.required],
    });
  }

  onSubmit() {
    // Handle form submission logic here
    const formValues = this.classroomForm.value;
    // Call the handleSubmit function or perform your desired actions
  }
  validateField(field: string, code: string) {
    const formControl = this.classroomForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }
  onClose() {
    // Handle close modal logic here
    this.modal.dismiss()
  }
}
