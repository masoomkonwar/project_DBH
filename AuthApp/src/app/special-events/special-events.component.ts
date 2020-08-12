import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {Jobdetails}from '../jobdetails'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  specialEvents = []
  jobstypes = ['webdevelopment','app development','painting','']
  jobModel = new Jobdetails('website','design a website')
  constructor(private _event :EventsService,private _router:Router,private _auth:AuthService) { }

  ngOnInit(): void {
    this._event.getSpecialEvents().subscribe(
      res=>this.specialEvents=res,
      err=>{console.log(err)
        if(err instanceof HttpErrorResponse)
        {
          if(err.status===401||err.status===500)
          {
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }
  showevents()
  {
    console.log(this.specialEvents)
  }
  addToEvents(){
    this.specialEvents.push(this.jobModel)
    console.log(this.specialEvents)
    this._auth.updateJobs(this.jobModel).subscribe(
      res=> {console.log(res)},
      err=>console.log(err)
      
    )
  }

}
