import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface GridItem {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  constructor(private router: Router) {}
  gridItems: GridItem[] = [
    {
      image: '../../assets/images/image1.png',
      title:  "title1",
      description:
        "description1",
    },
    {
      image: '../../assets/images/image2.png',
      title: "title2",
      description: "description2",
    },
    {
      image: '../../assets/images/image3.png',
      title:  "title3",
      description :"description3",
    },
    {
      image: '../../assets/images/image4.png',
      title:  "title4",
      description: "description4",
    },
  ];
  startSignup(): void {
    this.router.navigate(['login']);
  }
  goToPreview(): void {
    this.router.navigate(['/preview']);
  }
}
