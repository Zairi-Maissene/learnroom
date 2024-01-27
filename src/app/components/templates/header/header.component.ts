import {Component, inject, Input} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {TranslateService} from "@ngx-translate/core";

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
  translate = inject(TranslateService)
  selectedLanguage: string = 'fr'; // Set the default language here

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlWithoutQueryParams = event.url.split('?')[0];

        this.showHeader = !(
          urlWithoutQueryParams.startsWith('/auth/login') ||
          urlWithoutQueryParams.startsWith('/auth/register')
        );
      }
      this.selectedLanguage = this.translate.currentLang;
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
  onLanguageChange(language: string): void {
    this.translate.use(language);
  }

}
