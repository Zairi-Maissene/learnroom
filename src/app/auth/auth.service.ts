import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../helpers/helpers';
import { Classroom } from '../classroom/classroom.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Course } from '../course/course.service';
import { Task } from '../task/task.service';
import { Assignement } from '../assignment/assignement.service';
import { Router } from '@angular/router';

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
  private userSubject: BehaviorSubject<User | null>;
  user$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  constructor(private api: ApiService) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!),
    );
    this.user$ = this.userSubject.asObservable();
    this.isAuthenticated$ = this.userSubject.pipe(map((res) => res != null));
  }

  signIn(data: SignIn) {
    return this.api.post<User>(`/user/signin`, data).pipe(
      tap((res: any) => {
        if (this.isUserData(res)) {
          localStorage.setItem('user', JSON.stringify(res));
          if (res.user) {
            localStorage.setItem('isTeacher', JSON.stringify(res.user));
          }
          this.userSubject.next(res);
        }
      }),
    );
  }
  signUp(data: SignUp) {
    return this.api.post<User>(`/user/signup`, data);
  }

  getUserData(id: string, isTeacher: boolean) {
    return this.api.get<{
      courses: Course[];
      tasks: Task[];
      assignments: Assignement[];
    }>(`/user/${id}/${isTeacher}`);
  }

  private isUserData(data: any): data is User {
    return typeof data === 'object' && 'id' in data;
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
  }
}
