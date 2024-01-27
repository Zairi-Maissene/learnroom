import {Injectable} from '@angular/core';
import {ApiService} from '../../helpers/helpers';
import {Classroom} from '../classroom/classroom.service';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

export type SignIn = {
  email: string;
  password: string;
};
export type SignUp = SignIn & {
  name: string;
  user: boolean;
};
export type Teacher = {
  id: string;
  email: string;
  name: string;
  avatar_color: string;
  classes: Classroom[];
  user: boolean;
};
export type Student = {
  id: string;
  email: string;
  name: string;
  avatar_color: string;
  classes: Classroom[];
  responseTasks: any[];
  responseAssignments: any[];
  user: boolean;
};
export type User = Teacher | Student;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  readonly user$: Observable<User>;
  readonly isTeacher$: Observable<boolean>;
  readonly isAuthenticated$: Observable<boolean>;


  constructor(private api: ApiService,private readonly CookieService:CookieService,private router:Router) {
    this.userSubject = new BehaviorSubject({} as User);
    this.user$ = this.userSubject.asObservable();
    this.isTeacher$ = this.userSubject.pipe(map((res) => res.user));
    this.isAuthenticated$ = this.user$.pipe(map((res) => Boolean(this.CookieService.get('auth') && res.id)));
    if (this.CookieService.get('auth')) {
      this.getUser()
    }
  }

  signIn(data: SignIn) {
    return this.api.post<{token:String}>(`/user/signin`, data).pipe(
      tap((res: any) => {
        this.CookieService.deleteAll("auth")
        this.CookieService.set('auth', res.token,{
          expires: 1,
          path: '/',
          secure: true,
          sameSite: 'Strict'
        });
        this.getUser()
      }),
    );
  }
  signUp(data: SignUp) {
    return this.api.post<User>(`/user/signup`, data).pipe(
      tap((res: any) => {
        this.CookieService.deleteAll('auth')
        this.CookieService.set('auth', res.token,{
          expires: 1,
          path: '/',
          secure: true,
          sameSite: 'Strict'
        });
      }),
    );
  }
  logout() {
    this.CookieService.deleteAll("auth");
    this.userSubject.next({} as User);
  }

  getUser() {
    return this.api.get<User>(`/user/current`,false,false).pipe(
      tap((res) => {
        console.log(res);
        this.userSubject.next(res);
        this.router.navigate(['/classroom']);
      }),
      catchError((err) => {
        this.logout();
        return err;
      })
    ).subscribe()
  }
}
