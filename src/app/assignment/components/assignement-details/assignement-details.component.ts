import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Assignement,
  AssignementService,
  ResponseAssignement,
} from '../../assignement.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.scss'],
})
export class AssignementDetailsComponent implements OnInit {
  user: any = { role: 'teacher' };
  assignmentId: string = '';
  assignment$: Observable<Assignement> = new Observable<Assignement>();
  responseAssignment: ResponseAssignement[] = [];
  submitAssignmentForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
  });
  moreBtn: boolean = false;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private assignementService: AssignementService,
  ) {}

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.params['id'];
    this.assignment$ = this.assignementService.getAssignment(this.assignmentId);
    this.assignment$.subscribe((data) => {
      if (data && (data.responseAssignments as ResponseAssignement[])) {
        this.responseAssignment = [...data.responseAssignments]; // Creating a shallow copy
      }
    });
  }
  getUser: any = () => {
    return {};
  };
  onSubmit: any = () => {
    this.assignementService.updateResponseAssignment(
      this.assignmentId,
      this.submitAssignmentForm.value,
    );
  };

  protected readonly Date = Date;
  toggleBtn() {
    this.moreBtn = !this.moreBtn;
  }
  submitEditAssignment() {
    this.assignementService.updateAssignment(
      this.assignmentId,
      this.submitAssignmentForm.value,
    );
  }
  deleteAssignment() {
    this.assignementService.deleteAssignment(this.assignmentId);
  }
  toggleEditMode(mode: boolean) {
    this.editMode = mode;
  }
  submitResponseAssignment(assignementResponseId: string) {}
  onScoreChange(event: Event, index: number) {
    const newScore = (event.target as HTMLInputElement).value;
    const updatedResponse: ResponseAssignement[] = this.responseAssignment.map(
      (item, i) => {
        if (i === index) {
          return { ...item, score: parseInt(newScore) };
        }
        return item;
      },
    );
    this.responseAssignment = updatedResponse;
  }

  protected readonly JSON = JSON;
}
