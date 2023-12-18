import { TemplateRef } from '@angular/core';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error: string = '';
  modalService = inject(NgbModal)
  constructor() { }
  showError(error: string) {
    this.error= error
    this.modalService.open(ErrorModalComponent, { ariaLabelledBy: 'modal-basic-title' })
  }
}
