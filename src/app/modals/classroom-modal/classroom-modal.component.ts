// Import necessary Angular modules
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-classroom-modal',
  templateUrl: './classroom-modal.component.html',
  styleUrls: ['./classroom-modal.component.sass']
})
export class ClassroomModalComponent {
  @Input() values = { name: '', description: '' };

  classroomForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.classroomForm = this.fb.group({
      name: [this.values.name, Validators.required],
      description: [this.values.description, Validators.required],
    });
  }

  onSubmit() {
    // Handle form submission logic here
    const formValues = this.classroomForm.value;
    console.log(this.classroomForm.get('name'));
    // Call the handleSubmit function or perform your desired actions
  }

  onClose() {
    // Handle close modal logic here
  }
}
