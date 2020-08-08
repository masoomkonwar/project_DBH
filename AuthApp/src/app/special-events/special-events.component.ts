import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  specialEvents = []
  constructor(private _event :EventsService,private _router:Router) { }

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

}
