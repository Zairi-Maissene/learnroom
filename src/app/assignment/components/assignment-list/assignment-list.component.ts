import {Component, inject, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AssignmentFormComponent} from '../../../modals/assignment-form/assignment-form.component';
import {Assignement} from '../../assignement.service';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss'],
})
export class AssignmentListComponent {
  @Input() assignments: Assignement[] = [];
  @Input() courseId: string | undefined;

  modalService = inject(NgbModal)
  authService = inject(AuthService)
  onAddAssignmentClick() {
   const modal =  this.modalService.open(AssignmentFormComponent);
   modal.componentInstance.courseId = this.courseId
  }
  /*getAssignments(): void {
    // Fictive data, replace with your actual service call
    this.assignments = [
      {
        id: '1',
        name: 'assignments 1',
        description: 'Description for assignments 1',
      },
      {
        id: '2',
        name: 'assignments 2',
        description: 'Description for assignments 2',
      },
      // Add more tasks as needed
    ];
  }*/
}
