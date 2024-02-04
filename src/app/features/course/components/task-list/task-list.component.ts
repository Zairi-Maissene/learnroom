import { ChangeDetectionStrategy } from '@angular/core';
import { Component, inject, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '@core/models/task.model';
import { AuthPersistence } from '@core/services/auth.persistence';
import { TaskFormComponent } from '@features/task/components/task-form/task-form.component';
import { TaskService } from '@features/task/task.service';
import { CourseService } from '@features/course/course.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() courseId: string | undefined;
  @Input() inCard: boolean = false;
  @Input() withButton: boolean = false;
  authService = inject(AuthPersistence); // Fictive data, replace with your actual data
  modal = inject(NgbModal);
  courseService = inject(CourseService);
  taskService = inject(TaskService);

  onAddTaskClick(): void {
    const modal = this.modal.open(TaskFormComponent);
    modal.componentInstance.submit.subscribe((emittedValue: any) =>
      this.addTask(emittedValue),
    );
  }

  addTask(formValues: any) {
    const courseId = this.courseId as string;

    this.taskService
      .addTask(courseId, formValues)
      .pipe(switchMap(() => this.courseService.getTasks(courseId)))
      .subscribe((tasks) => (this.tasks = tasks));
  }
}
