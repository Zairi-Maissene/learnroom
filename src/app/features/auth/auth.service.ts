import {tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {SignIn, SignUp, User} from '@core/models/user.model';
import {Course} from '@core/models/course.model';
import {Assignement} from '@core/models/assignment.model';
import {Task} from '@core/models/task.model';
import {AuthPersistence} from '@core/services/auth.persistence';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: ApiService,
    private readonly CookieService: CookieService,
    private router: Router,
    private readonly authPersistenceService: AuthPersistence,
  ) {
    if (this.CookieService.get('auth')) {
      this.getUser();
    } else {
       this.logout();
      // router.navigate(['/login']);
    }
  }

  signIn(data: SignIn) {
    return this.api.post<{token:String}>(`/user/signin`, data,"You are now connected as "+data.email).pipe(
      tap((res: any) => {
        if (res.token) {
          this.CookieService.set('auth', res.token, {
            expires: 1,
            path: '/',
            secure: true,
            sameSite: 'Strict',
          });
          localStorage.setItem('auth', 'true');
          this.getUser(true);
        }
      }),
    );
  }
  signUp(data: SignUp) {
    return this.api.post<User>(`/user/signup`, data,"Account is create successfully").pipe(
      tap((res: any) => {
        if (res.token) {
          this.CookieService.deleteAll('auth');
          this.CookieService.set('auth', res.token, {
            expires: 1,
            path: '/',
            secure: true,
            sameSite: 'Strict',
          });
          localStorage.setItem("auth", "true")
          this.getUser(true)
        }
      }),
    );
  }
  logout() {

    this.CookieService.deleteAll('auth');
    this.authPersistenceService.userSubject.next({} as User);
    localStorage.setItem('auth', 'false');
  }

  getUser(navigateToClassroom: boolean = false) {
    return this.api.get<User>(`/user/current`,undefined,false,false).pipe(
      tap((res) => {
        if (res.id) {
          this.authPersistenceService.userSubject.next(res);
          if (navigateToClassroom) {
            this.router.navigate(['/classroom']);
          }          return
        }
        this.logout();
      }),
      catchError((err) => {

        this.logout();
        return err;
      })
    ).subscribe()
  }

  getAll() {
    return this.api.get<{
      courses: Course[][];
      tasks: Task[][];
      assignments: Assignement[][];
    }>(`/user/all`);
  }
}
