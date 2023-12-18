import {Component, OnInit} from '@angular/core';
import {Assignement, AssignementService} from "../assignement.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.scss']
})
export class AssignementDetailsComponent implements OnInit {
  user: any = {role:"teacher"}
  assignmentId: string="";
  assignment$: Observable<Assignement> = new Observable<Assignement>();
  submitAssignmentForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required)
  });
  editAssignmentForm: FormGroup = new FormGroup({
  //  points: new FormControl(this.assignment.points),
   // deadline: new FormControl(this.assignment.deadline),
   // content: new FormControl(this.assignment.content)

  });
  moreBtn:boolean=false;
  editMode:boolean=false;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,private assignementService: AssignementService)
  {}

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.params['id'];
    this.assignment$=this.assignementService.getAssignment(this.assignmentId)

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
    this.assignementService.editAssignement(this.submitAssignmentForm.value,this.assignmentId)
    this.toggleEditMode()
  }
  deleteAssignment(){
    this.assignementService.deleteAssignement(this.assignmentId)
  }
  toggleEditMode(){
    this.editMode=!this.editMode;
  }

  protected readonly JSON = JSON;
}
