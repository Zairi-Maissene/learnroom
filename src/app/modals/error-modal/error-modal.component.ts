import { Component } from '@angular/core';
import { ErrorService } from '../../error.service'; // Import your error service

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
})
export class ErrorModalComponent {
  constructor(public errorService: ErrorService) {}
}
