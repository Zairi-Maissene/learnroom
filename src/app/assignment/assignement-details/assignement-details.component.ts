import {Component, OnInit} from '@angular/core';
import {AssignementService} from "../assignement.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.scss']
})
export class AssignementDetailsComponent implements OnInit {
  user: any = {role:"teacher"}
  assignment:any = {}
  submitAssignmentForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required)
  });
  editAssignmentForm: FormGroup = new FormGroup({
    points: new FormControl(this.assignment.points),
    deadline: new FormControl(this.assignment.deadline),
    content: new FormControl(this.assignment.content)

  });
  moreBtn:boolean=false;
  editMode:boolean=false;

  constructor(private formBuilder: FormBuilder,private assignementService: AssignementService)
  {}

  ngOnInit(): void {
    this.assignment=this.assignementService.getAssignement("")

  }
  getUser: any = () => {
    return {}
  }
  onSubmit: any = () => {
     this.assignementService.submitInAssignement(this.submitAssignmentForm.value)
  }

  protected readonly Date = Date;
  toggleBtn()
  {
    this.moreBtn=!this.moreBtn;
  }
  submitEditAssignment(){
    this.assignementService.editAssignement(this.submitAssignmentForm.value,this.assignment.id)
    this.toggleEditMode()
  }
  deleteAssignement(){
    this.assignementService.deleteAssignement(this.assignment.id)
  }
  toggleEditMode(){
    this.editMode=!this.editMode;
  }
}
