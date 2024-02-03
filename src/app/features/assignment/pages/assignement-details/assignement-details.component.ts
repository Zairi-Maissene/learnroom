import {Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Assignement, ResponseAssignement} from "@core/models/assignment.model";
import {AuthPersistence} from "@core/services/auth.persistence";
import {AssignmentFormComponent} from "@features/assignment/components/assignment-form/assignment-form.component";
import {AssignementService} from "@features/assignment/assignement.service";


@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.scss']
})
export class AssignementDetailsComponent implements OnInit {
  user: any = {role:"teacher"}
  assignmentId: string="";
  assignment: Assignement = {} as Assignement;
  responsesAssignment:ResponseAssignement[]=[]
  studentResponse:ResponseAssignement | undefined;
  submitAssignmentForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  editMode:boolean=false;
  isAssignmentSubmited:boolean=false;
  modalService = inject(NgbModal);
  isTeacher : boolean = false;
  scoreForm = this.formBuilder.group({
      responses: this.formBuilder.array([])
});
  responses= this.scoreForm.get('responses') as FormArray;
  constructor(private route: ActivatedRoute,
              public authService : AuthPersistence,
              private router:Router,
              private formBuilder: FormBuilder,
              private assignmentService: AssignementService)
  {


  }

  ngOnInit(): void {
    this.route.params.pipe(tap(param=>{
      this.assignmentId = param['id']

      this.assignmentService.getAssignment(this.assignmentId).pipe(
        tap(res => {
          this.assignment = res
        })
      ).subscribe()

       this.authService.isTeacher$.subscribe((user) => {
          this.isTeacher = user;
        if (!this.isTeacher) {
          this.assignmentService.getResponseAssignment(this.assignmentId).pipe(
            tap(res => {
              if(res)
              this.studentResponse = res
            })
          ).subscribe()
        }
        else{
          this.assignmentService.getAssignmentResponses(this.assignmentId).pipe(
            tap(res => {
              if(res && res.length>0) {
                this.responsesAssignment = res
                const responsesArray = this.scoreForm.get('responses') as FormArray;


                this.responsesAssignment.forEach((response) => {
                  const responseForm = this.formBuilder.group({
                    id: response.id,
                    score: response.score,
                    content: response.content,
                    student: "student Name",
                    validated: response.score > 0,
                  })
                  this.responses.push(responseForm)

                })

              }
            })
          ).subscribe()
        }
        })
    })).subscribe();


  }
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
  onScoreChange(index: number) {
    const responsesArray = this.scoreForm.get('responses') as FormArray;
    const score = responsesArray.at(index)?.get('score')?.value;
    const id = responsesArray.at(index)?.get('id')?.value;
    this.assignmentService.validateResponseAssignment(id, {score:score}).subscribe(
      {
        next: (res) => {
          responsesArray?.at(index)?.patchValue({ validated: true });
          console.log('this',this.scoreForm.get('responses')?.value )
        }
      }
    )

  }

  onSubmit: any = () => {
    this.assignmentService.createResponseAssignment(this.assignmentId,this.submitAssignmentForm?.value).subscribe(
      {
        next: (res) => {
          this.studentResponse = res;
          this.isAssignmentSubmited=true;
        }
      }
    );  }


}
