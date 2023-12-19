import { Component, inject, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  router = inject(Router);
  isLoggedIn: boolean = false;
  @Input() isOpen: boolean = false;
  showHeader: boolean = true;

  constructor() {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !['/auth/login', '/auth/register'].includes(
          event.url,
        );
      }
    });
  }
  navigateToPreview(): void {
    this.router.navigate(['']);
  }

  signIn(): void {
    this.isLoggedIn = true;
    this.router.navigate(['auth/login']);
  }

  signUp(): void {
    this.isLoggedIn = true;
    this.router.navigate(['auth/register']);
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
