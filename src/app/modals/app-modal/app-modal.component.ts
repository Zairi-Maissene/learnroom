import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Component, inject, TemplateRef } from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgbDatepickerModule],
  templateUrl: './app-modal.component.html',
})
export class AppModalComponent {
  private modalService = inject(NgbModal);
  @Input() title: string | undefined;
  @ViewChild('content') content: TemplateRef<any> | undefined; // Define the template reference variable

  open() {
    this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
}
