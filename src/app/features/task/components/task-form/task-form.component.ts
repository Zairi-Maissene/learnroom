import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Task} from "@core/models/task.model";


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'], // Add your styles if needed
})
export class TaskFormComponent {

  @Input() isEditing: boolean = false;
  @Input() task: Task = {} as Task;
  @Input() taskId: string = '1';

  @Output() submit = new EventEmitter<any>();
  buttonName: string = 'Add';
  taskForm: FormGroup= new FormGroup({});
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
  ) {

  }
  ngOnInit(){
    if (this.isEditing){
      this.buttonName = 'Edit';
      this.taskForm=this.fb.group({
        name: [this.task.name, Validators.required],
        content: [this.task.content, Validators.required],
      })
    }
    else
    {this.taskForm = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
    });}
  }

  validateField(field: string, code: string) {
    const formControl = this.taskForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      this.submit.emit(formData);
      this.modal.close();
    }
  }

  onClose() {
    this.modal.dismiss();
  }
}
