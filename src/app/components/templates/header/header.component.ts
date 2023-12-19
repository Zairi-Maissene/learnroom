import {Component, inject, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  router = inject(Router);
  isLoggedIn: boolean = false;
  @Input() isOpen: boolean = false;

  navigateToPreview(): void {
    this.router.navigate(['']);
  }

  signIn(): void {
    this.isLoggedIn = true;
    this.router.navigate(['login']);
  }

  signUp(): void {
    this.isLoggedIn = true;
  }

  signOut(): void {
    this.isLoggedIn = false;
  }

  getItem(key: string): any {
    // Implement your logic to retrieve user data based on the key
    // For example, you might use a service to fetch user data
    return { user: true };
  }
}
