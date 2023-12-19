import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrls: ['./element-details.component.scss']
})
export class ElementDetailsComponent {
  @Input() user: any;
  @Input() element$: Observable<any> = new Observable<any>();
  @Input() elementType: string = "";
  @Input() editMode: boolean = false;
  @Input() submitEditElement: any;
  @Input() deleteElement: any;
  @Input() editElementForm: FormGroup = new FormGroup({
    points: new FormControl(),
    deadline: new FormControl(),
    content: new FormControl()

  });
  @Output() editModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editElementFormChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.editModeChange.emit(this.editMode);
  }
  constructor() {
  }


}
