import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Assignement, AssignementService, ResponseAssignement} from "../../assignement.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, switchMap, tap} from "rxjs";
import {EditTaskFormComponent} from "../../../modals/edit-task-form/edit-task-form.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../../auth/auth.service";
import {AssignmentFormComponent} from "../../../modals/assignment-form/assignment-form.component";

@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.scss']
})
export class AssignementDetailsComponent implements OnInit {
  user: any = {role:"teacher"}
  assignmentId: string="";
  assignment: Assignement = {} as Assignement;
  assignment$: Observable<Assignement> = new Observable<Assignement>();
  responseAssignment$: Observable<ResponseAssignement> = new Observable<ResponseAssignement>();
  responsesAssignment:ResponseAssignement[]=[]
  submitAssignmentForm: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  editMode:boolean=false;
  isAssignmentSubmited:boolean=false;
  modalService = inject(NgbModal);

  constructor(private route: ActivatedRoute,public authservice:AuthService, private router:Router,private formBuilder: FormBuilder,private assignmentService: AssignementService)
  {
    this.submitAssignmentForm.controls['description'].setErrors({ 'minLength': 'Min length 5 chars.' });

  }

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.params['id'];
    this.assignment$=this.assignmentService.getAssignment(this.assignmentId).pipe(
      tap(res => {this.assignment = res})
    );
    this.assignment$.subscribe(data => {
      if (data && data.responseAssignments as ResponseAssignement[]) {
        this.responsesAssignment = [...data.responseAssignments]; // Creating a shallow copy
      }
    });

    if(this.user.role=="student")
    {
      this.responseAssignment$=this.assignmentService.getResponseAssignment(this.assignmentId,"f486be62-384b-4d97-bf42-3fcf98342cb7")

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
     this.assignmentService.updateResponseAssignment(this.assignmentId,this.submitAssignmentForm.value)
      this.isAssignmentSubmited=true;
  }

  protected readonly Date = Date;
  submitEditAssignment(){
    this.assignmentService.updateAssignment(this.assignmentId,this.submitAssignmentForm.value)
  }
  deleteAssignment(){
  this.assignmentService.deleteAssignment(this.assignmentId)
  this.router.navigate(['/classroom']);

  }
  editAssignement(formValues:any)
  {
    this.assignmentService.updateAssignment(this.assignmentId, formValues)
    this.assignment$=this.assignmentService.getAssignment(this.assignmentId).pipe(
      tap(res => {this.assignment = res})
    );

  }
  toggleEditMode(mode:boolean){
    this.editMode=mode;
    const modal = this.modalService.open(AssignmentFormComponent)
    modal.componentInstance.assignment = this.assignment;
    modal.componentInstance.assignmentId = this.assignmentId
    modal.componentInstance.isEditing = true;
    modal.componentInstance.submit.subscribe((emmitedValue:any) => {
      this.editAssignement(emmitedValue)
    });

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
