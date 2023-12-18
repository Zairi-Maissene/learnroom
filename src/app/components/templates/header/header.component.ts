import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  navigateToPreview(): void {
    // Add logic for navigating to the preview page
  }

  signIn(): void {
    this.isLoggedIn=true;
  }

  signUp(): void {
    this.isLoggedIn=true;  }

  signOut(): void {
    this.isLoggedIn=false;  }
}
