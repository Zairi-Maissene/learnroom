import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit(loginForm: NgForm) {
    this.email = loginForm.value.email;
    this.password = loginForm.value.password;

    this.authService
      .signIn({ email: this.email, password: this.password })
      .pipe(
        tap(async (authenticated) => {
          if (authenticated) {
            alert('Vous êtes authentifié !');
            await this.router.navigate(['/home']);
          }
        }),
      )
      .subscribe();
    //this.router.navigate(['/cv-tech']);
  }
}
