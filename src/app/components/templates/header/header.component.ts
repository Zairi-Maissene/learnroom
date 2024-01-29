import {Component, inject, Input} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  router = inject(Router);
  @Input() isOpen: boolean = false;
  isCollapsed: boolean = true; // Add or modify this property as needed
  showHeader: boolean = true;
  authService = inject(AuthService);
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlWithoutQueryParams = event.url.split('?')[0]; // Get URL without query parameters

        this.showHeader = !(
          urlWithoutQueryParams.startsWith('/auth/login') ||
          urlWithoutQueryParams.startsWith('/auth/register')
        );
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

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
