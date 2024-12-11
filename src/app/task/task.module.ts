import { NgModule } from '@angular/core';
import { TaskRoutingModule } from './task-routing.module';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CourseModule } from '../course/course.module';
import { TaskFormComponent } from '../modals/task-form/task-form.component';
import {AppModule} from "../app.module";
import {EditTaskFormComponent} from "../modals/edit-task-form/edit-task-form.component";

@NgModule({
  declarations: [TaskDetailsComponent, EditTaskFormComponent,TaskListComponent, TaskFormComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule,
        SharedModule,
    ],
  exports: [TaskListComponent],
})
export class TaskModule {}