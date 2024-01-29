import { Component, ViewEncapsulation  } from '@angular/core';
import {LoaderService} from "../loader.service";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {

  loaderClass!: string;
  private updateClassSubscription!: Subscription;


  constructor(public loader: LoaderService) {}

  ngOnInit() {
    this.loaderClass = this.assignRandomLoaderClass();
    this.setupClassUpdater();
  }

  ngOnDestroy() {
    if (this.updateClassSubscription) {
      this.updateClassSubscription.unsubscribe();
    }
  }

  assignRandomLoaderClass() {
    const classes = ['loader', 'loader1', 'loader2'];
    const randomIndex = Math.floor(Math.random() * classes.length);
    return classes[randomIndex];
  }

  private setupClassUpdater(): void {

    this.updateClassSubscription = interval(5000).subscribe(() => {
      this.loaderClass = this.assignRandomLoaderClass();
    });
  }
}

