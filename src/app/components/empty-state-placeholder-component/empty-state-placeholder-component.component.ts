import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-empty-state-placeholder',
  templateUrl: './empty-state-placeholder-component.component.html',
  styleUrls: ['./empty-state-placeholder-component.component.scss']
})
export class EmptyStatePlaceholderComponentComponent {
  @Input() type: string = '';
  @Input() user: string = '';

  image = 'src/assets/images/emptyState.png';

  title = 'No Courses';
  descriptionText1 = 'There are no courses in this classroom yet.';
  descriptionText2 = 'Wait for your teacher to publish one.';

  constructor() {
    if (this.user === 'teacher') {
      this.descriptionText2 = 'Publish one.';
    }
    if (this.type === 'task') {
      this.title = 'No Tasks';
      this.descriptionText1 = 'There are no tasks in this classroom yet.';
    }
    if (this.type === 'assignment') {
      this.title = 'No Assignments';
      this.descriptionText1 = 'There are no assignments in this classroom yet.';
    }
  }

  goHome(): void {
    // Navigate to home page
    // You should inject Router service and use it for navigation
  }
}
