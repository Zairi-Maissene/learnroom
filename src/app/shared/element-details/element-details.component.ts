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
  @Input() deleteElement: any;

  @Output() editModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.editModeChange.emit(this.editMode);
  }
  constructor() {
  }


}
