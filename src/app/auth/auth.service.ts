import {Injectable} from '@angular/core';
import {ApiService} from "../../helpers/helpers";
import {Student, Teacher} from "../app.service";

export type SignIn = {
  email: string,
  password: string
}
export type SignUp = SignIn & {
  name: string,
  user: boolean
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
