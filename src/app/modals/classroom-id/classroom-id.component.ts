import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-classroom-id',
  templateUrl: './classroom-id.component.html',
})
export class ClassroomIdComponent {
  @Input() values = { id: '' };
  classroomForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.classroomForm = this.fb.group({
      id: [this.values.id, [Validators.required]],
    });
  }

  onSubmit() {}
}
