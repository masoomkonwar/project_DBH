import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _jobsUrl = "http://localhost:3000/api/updatejobs"
  constructor(private http : HttpClient,private _router:Router) { }

  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl,user)
  }
  updateJobs(job)
  {
    return this.http.post<any>(this._jobsUrl,job)
  }
  loginUser(user)
  {
    return this.http.post<any>(this._loginUrl,user)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken()
  {
    return localStorage.getItem('token')
  }
  logout()
  {
    localStorage.removeItem('token')
    this._router.navigate(['/events'])

  }
}
