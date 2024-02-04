import { ChangeDetectionStrategy } from '@angular/core';
import { Component, inject, Input } from '@angular/core';
import { Assignement } from '@core/models/assignment.model';
import { AuthPersistence } from '@core/services/auth.persistence';
import { AssignementService } from '@features/assignment/assignement.service';
import { AssignmentFormComponent } from '@features/assignment/components/assignment-form/assignment-form.component';
import { CourseService } from '@features/course/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss'],
})
export class AssignmentListComponent {
  @Input() assignments: Assignement[] = [];
  @Input() courseId: string | undefined;
  @Input() inCard: boolean = false;
  @Input() withButton: boolean = false;

  modalService = inject(NgbModal);
  authService = inject(AuthPersistence);
  assignmentService = inject(AssignementService);
  courseService = inject(CourseService);
  onAddAssignmentClick() {
    const modal = this.modalService.open(AssignmentFormComponent);
    modal.componentInstance.submit.subscribe((emittedValue: any) =>
      this.addAssignment(emittedValue),
    );
  }
  addAssignment(data: any) {
    const courseId = this.courseId as string;

    this.assignmentService
      .addAssignement(courseId, data)
      .pipe(switchMap(() => this.courseService.getAssignments(courseId)))
      .subscribe((assignments) => (this.assignments = assignments));
  }
}
