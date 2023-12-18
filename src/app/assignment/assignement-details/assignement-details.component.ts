import {Component, OnInit} from '@angular/core';
import {AssignementService} from "../assignement.service";

@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.scss']
})
export class AssignementDetailsComponent {
  private assignement:any = {}

  constructor(private assignementService: AssignementService)
  {}

  ngOnInit(): void {
    this.assignement=this.assignementService.getAssignement("")
  }

}
