import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  @Input() isOpen: boolean = false;

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

  getItem(key: string): any {
    // Implement your logic to retrieve user data based on the key
    // For example, you might use a service to fetch user data
    return { user: true };
  }
}
