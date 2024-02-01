import {Component, inject, OnInit} from '@angular/core';
import {Assignement, AssignementService, ResponseAssignement} from "../../assignement.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";
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
    this.route.params.pipe(tap(param=>{
      this.assignmentId = param['id']
    this.assignmentId = this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(this.assignmentId).pipe(
      tap(res => {this.assignment = res})
    ).subscribe()
    this.assignment$.subscribe(data => {
      if (data && data.responseAssignments as ResponseAssignement[]) {
        this.responsesAssignment = [...data.responseAssignments]; // Creating a shallow copy
      }
    });

    if(this.user.role=="student")
    {
      this.responseAssignment$=this.assignmentService.getResponseAssignment(this.assignmentId)

      this.responseAssignment$.subscribe(data => {
        if (data.content) {
          this.isAssignmentSubmited = true
        }
      });
  
      if(this.user.role=="student")
      {
        this.responseAssignment$=this.assignmentService.getResponseAssignment(this.assignmentId)
  
        this.responseAssignment$.subscribe(data => {
          if (data.content) {
            this.isAssignmentSubmited = true
          }
        });
      }
    }})).subscribe();
    
  }
  getUser: any = () => {
    return {}
  }
  onSubmit: any = () => {
     this.assignmentService.updateResponseAssignment(this.assignmentId,this.submitAssignmentForm.value)
      this.isAssignmentSubmited=true;
  }

  protected readonly Date = Date;

  deleteAssignment(){
  this.assignmentService.deleteAssignment(this.assignmentId)
  this.router.navigate(['/classroom']);

  }
  editAssignement(formValues:any)
  {
    this.assignmentService.updateAssignment(this.assignmentId, formValues)
    this.assignmentService.getAssignment(this.assignmentId).pipe(
      tap(res => {this.assignment = res})).subscribe()


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
