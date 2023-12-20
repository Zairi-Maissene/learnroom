import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
})
export class AssignmentFormComponent {
  @Input() values = {
    name: '',
    content: '',
    points: undefined,
    deadline: undefined,
  };
  assignmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
  ) {
    this.assignmentForm = this.fb.group({
      name: [this.values.name, [Validators.required]],
      content: [this.values.content, [Validators.required]],
      points: [this.values.points, [Validators.required]],
      deadline: [this.values.deadline, [Validators.required]],
    });
  }

  validateField(field: string, code: string) {
    const formControl = this.assignmentForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }

  onSubmit() {
    if (this.assignmentForm.valid) {
      // Handle form submission or emit an event
    }
  }
  onClose() {
    this.activeModal.dismiss();
  }
}
