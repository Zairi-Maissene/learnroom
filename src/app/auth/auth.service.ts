import { Injectable } from '@angular/core';
import { ApiService } from '../../helpers/helpers';
import { Classroom } from '../classroom/classroom.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

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
};
export type Student = {
  id: string;
  email: string;
  name: string;
  avatar_color: string;
  classes: Classroom[];
  responseTasks: any[];
  responseAssignments: any[];
};
export type User = Teacher | Student;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  user$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  constructor(private api: ApiService<Student | Teacher>) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!),
    );
    this.user$ = this.userSubject.asObservable();
    this.isAuthenticated$ = this.userSubject.pipe(map((res) => res != null));
  }

  signIn(data: SignIn) {
    return this.api.post(`/auth/signin`, data).pipe(
      tap((res: any) => {
        if (this.isUserData(res)) {
          const token = {
            token: res.id,
            email: data.email,
          };
          localStorage.setItem('user', JSON.stringify(res));
          this.userSubject.next(res);
        }
      }),
    );
  }
  signUp(data: SignUp) {
    return this.api.post(`/auth/signup`, data);
  }

  getUserData(id: string, isTeacher: boolean) {
    return this.api.get(`/auth/user/${id}/${isTeacher}`);
  }

  private isUserData(data: any): data is User {
    return typeof data === 'object' && 'id' in data;
  }
}
