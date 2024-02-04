import { ChangeDetectionStrategy } from '@angular/core';
import { Input } from '@angular/core';
import { Component, inject, OnInit } from '@angular/core';
import { Classroom } from '../../../../core/models/classroom.model';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassroomListComponent{
  @Input() classrooms: Classroom[] = [];
}
