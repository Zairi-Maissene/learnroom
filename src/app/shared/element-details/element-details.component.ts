import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrls: ['./element-details.component.scss'],
})
export class ElementDetailsComponent {
  @Input() user: any;
  @Input() element$: Observable<any> = new Observable<any>();
  @Input() editMode: boolean = false;
  @Input() toggleEditMode: any;
  @Input() submitEditElement: any;
  @Input() deleteElement: any;
  @Input() editElementForm: FormGroup = new FormGroup({
    points: new FormControl(),
    deadline: new FormControl(),
    content: new FormControl(),
  });
  constructor() {}
}
