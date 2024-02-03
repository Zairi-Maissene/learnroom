import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
})
export class TextButtonComponent {
  displayTextKeys: string[] = [
    'textButton.content1',
    'textButton.content2',
    'textButton.content3',
    'textButton.content4',
    'textButton.content5',
    'textButton.content6',
  ];

  constructor() {}

  // Use translation keys for displayText
  displayText: string[] = this.displayTextKeys;

  handleButtonClick(text: number): void {
    if (text === 1) {
      this.displayTextKeys = [
        'textButton.content1',
        'textButton.content2',
        'textButton.content3',
        'textButton.content4',
        'textButton.content5',
        'textButton.content6',
      ];
    } else if (text === 2) {
      this.displayTextKeys = [
        'textButton.content7',
        'textButton.content8',
        'textButton.content9',
        'textButton.content10',
        'textButton.content11',
      ];
    }

    // Update displayText using translation keys
    this.displayText = this.displayTextKeys;
  }
}
