import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'], // Add your styles if needed
})
export class TaskFormComponent {
  taskForm: FormGroup;
  @Output() submit = new EventEmitter<any>();

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      points: [null, [Validators.required, Validators.min(1)]],
    });
  }

  validateField(field: string, code: string) {
    const formControl = this.taskForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Handle form submission
      const formData = this.taskForm.value;
      this.submit.emit(formData);
      this.modal.dismiss();
    }
  }

  onClose() {
    this.modal.dismiss();
  }
}
