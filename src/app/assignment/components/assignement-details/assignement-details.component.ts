import {Component, OnInit, ViewChild} from '@angular/core';
import {Assignement, AssignementService, ResponseAssignement} from "../../assignement.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.scss']
})
export class AssignementDetailsComponent implements OnInit {
  user: any = {role:"student"}
  assignmentId: string="";
  assignment$: Observable<Assignement> = new Observable<Assignement>();
  responseAssignment$: Observable<ResponseAssignement> = new Observable<ResponseAssignement>();
  responsesAssignment:ResponseAssignement[]=[]
  submitAssignmentForm: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  editMode:boolean=false;
  isAssignmentSubmited:boolean=false;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,private assignementService: AssignementService)
  {
    this.submitAssignmentForm.controls['description'].setErrors({ 'minLength': 'Min length 5 chars.' });

  }

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.params['id'];
    this.assignment$=this.assignementService.getAssignment(this.assignmentId)
    this.assignment$.subscribe(data => {
      if (data && data.responseAssignments as ResponseAssignement[]) {
        this.responsesAssignment = [...data.responseAssignments]; // Creating a shallow copy
      }
    });

    if(this.user.role=="student")
    {
      this.responseAssignment$=this.assignementService.getResponseAssignment(this.assignmentId,"f486be62-384b-4d97-bf42-3fcf98342cb7")

      this.responseAssignment$.subscribe(data => {
        if (data.content) {
          this.isAssignmentSubmited = true
        }
      });
    }
  }
  getUser: any = () => {
    return {}
  }
  onSubmit: any = () => {
     this.assignementService.updateResponseAssignment(this.assignmentId,this.submitAssignmentForm.value)
      this.isAssignmentSubmited=true;
  }

  protected readonly Date = Date;
  submitEditAssignment(){
    this.assignementService.updateAssignment(this.assignmentId,this.submitAssignmentForm.value)
  }
  deleteAssignment(){
    this.assignementService.deleteAssignment(this.assignmentId)
  }
  toggleEditMode(mode:boolean){
    this.editMode=mode;
  }
  submitResponseAssignment(assignementResponseId:string){

  }
  onScoreChange(event: Event, index: number) {
    const newScore=(event.target as HTMLInputElement).value;
    const updatedResponse:ResponseAssignement[] = this.responsesAssignment.map((item, i) => {
      if (i === index) {
        return {...item, score: parseInt(newScore)}
      }
      return item;
    });
    this.responsesAssignment = updatedResponse
  }




}
