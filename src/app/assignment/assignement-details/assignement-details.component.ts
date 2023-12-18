import {Component, OnInit} from '@angular/core';
import {AssignementService} from "../assignement.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.sass']
})
export class AssignementDetailsComponent implements OnInit {
  assignment:any = {}
  assignmentForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required)
  });  constructor(private formBuilder: FormBuilder,private assignementService: AssignementService)
  {}

  ngOnInit(): void {
    this.assignment=this.assignementService.getAssignement("")

  }
  getUser: any = () => {
    return {}
  }
  onSubmit: any = () => {
     this.assignementService.submitInAssignement(this.assignmentForm.value)
  }

  protected readonly Date = Date;
}
