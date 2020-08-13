import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth:AuthService,private _router:Router) { }
  registerUserData = {email:"",firstname:"",lastname:"",password:"",catagory:""}
  isDev=false
  jobstypes = ['webdevelopment','app development','painting']
  ngOnInit(): void {
  }

  onRegister()
  {
    console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData).subscribe(
      res=> {console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/special']);
      },
      err=>console.log(err)
      
    )
  }
  onRegisterDev()
  {
    console.log(this.registerUserData);
    this._auth.registerUserDev(this.registerUserData).subscribe(
      res=> {console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/special']);
      },
      err=>console.log(err)
      
    )
  }

}
