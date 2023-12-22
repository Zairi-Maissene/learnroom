import { inject } from '@angular/core';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../course/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {
  @Input() values = { name: '', content: '' };
  courseForm: FormGroup;
  courseService = inject(CourseService)
  @Input() classroomId: string = '';

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
  ) {
    this.courseForm = this.fb.group({
      name: [this.values.name, [Validators.required]],
      content: [this.values.content, [Validators.required]],
    });
  }
  validateField(field: string, code: string) {
    const formControl = this.courseForm.get(field);
    return formControl?.hasError(code) && formControl?.touched;
  }

  onSubmit() {
    if (this.courseForm.valid) {
      // Handle form submission or emit an event
      const formValues = this.courseForm.value;
      this.courseService.addCourse(this.classroomId, formValues)
    }
  }
  onClose() {
    this.modal.dismiss();
  }
}
