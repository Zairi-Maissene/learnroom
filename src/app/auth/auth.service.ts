import {Injectable} from '@angular/core';
import {ApiService} from "../../helpers/helpers";
import {Classroom} from "../classroom/classroom.service";

export type SignIn = {
  email: string,
  password: string
}
export type SignUp = SignIn & {
  name: string,
  user: boolean
}
export type Teacher = {
  id: string,
  email: string,
  name: string,
  avatar_color: string,
  classes: Classroom[]
}
export type Student = {
  id: string,
  email: string,
  name: string,
  avatar_color: string,
  classes: Classroom[],
  responseTasks: any[],
  responseAssignments: any[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api:ApiService<Student|Teacher>) {}

  signIn(data: SignIn) {
    return this.api.post(`/auth/signin`, data)
  }
  signUp(data: SignUp) {
    return this.api.post(`/auth/signup`, data)
  }

  getUserData(id:string,isTeacher:boolean) {
    return this.api.get(`/auth/user/${id}/${isTeacher}`)
  }
}
