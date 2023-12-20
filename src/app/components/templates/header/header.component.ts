import { Component, inject, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  router = inject(Router);
  @Input() isOpen: boolean = false;
  showHeader: boolean = true;
  authService = inject(AuthService);
  isLoggedIn$: Observable<boolean>;
  constructor() {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlWithoutQueryParams = event.url.split('?')[0]; // Get URL without query parameters

        this.showHeader = !(
          urlWithoutQueryParams.startsWith('/auth/login') ||
          urlWithoutQueryParams.startsWith('/auth/register')
        );

        console.log('show header', event.url);
      }
    });
  }
  navigateToPreview(): void {
    this.router.navigate(['']);
  }

  signIn(): void {
    this.router.navigate(['auth/login']);
  }

  signUp(): void {
    this.router.navigate(['auth/register']);
  }

  signOut(): void {
    this.router.navigate(['']);
    this.authService.logout();
  }

  getItem(key: string): any {
    // Implement your logic to retrieve user data based on the key
    // For example, you might use a service to fetch user data
    return { user: true };
  }
}
