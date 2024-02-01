import {Component, Input} from '@angular/core';
import {Student, User} from "../../../auth/auth.service";

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  @Input() students!: User[];

}
